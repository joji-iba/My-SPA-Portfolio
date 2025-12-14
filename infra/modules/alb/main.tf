// 外部向けALB
resource "aws_lb" "external" {
  name               = "${var.name}-${var.environment}-ext-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.external_alb_security_group_id]
  subnets            = var.public_subnet_ids

  tags = {
    Name        = "${var.name}-${var.environment}-ext-alb"
    Environment = var.environment
    Component   = "alb-external"
  }
}

// 内部向けALB
resource "aws_lb" "internal" {
  name               = "${var.name}-${var.environment}-int-alb"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [var.internal_alb_security_group_id]
  subnets            = var.private_subnet_ids

  tags = {
    Name        = "${var.name}-${var.environment}-int-alb"
    Environment = var.environment
    Component   = "alb-internal"
  }
}

// 外部向けALBのターゲットグループ
resource "aws_lb_target_group" "external_ecs" {
  name        = "${var.name}-${var.environment}-ext-tg"
  port        = var.target_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 30
    timeout             = 5
    path                = var.health_check_path
    matcher             = "200-299"
  }

  tags = {
    Name        = "${var.name}-${var.environment}-ext-tg"
    Environment = var.environment
    Component   = "alb-ext-tg"
  }
}

// 内部向けALBのターゲットグループ
resource "aws_lb_target_group" "internal_ecs" {
  name        = "${var.name}-${var.environment}-int-tg"
  port        = var.target_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 30
    timeout             = 5
    path                = var.health_check_path
    matcher             = "200-299"
  }

  tags = {
    Name        = "${var.name}-${var.environment}-int-tg"
    Environment = var.environment
    Component   = "alb-int-tg"
  }
}

// 外部向けALBリスナー（HTTP）
resource "aws_lb_listener" "external_http" {
  load_balancer_arn = aws_lb.external.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.external_ecs.arn
  }
}

// 外部向けALBリスナー（HTTPS）
resource "aws_lb_listener" "external_https" {
  count             = var.enable_https_external && var.external_certificate_arn != "" ? 1 : 0
  load_balancer_arn = aws_lb.external.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.external_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.external_ecs.arn
  }
}

// 内部向けALBリスナー（HTTP）
resource "aws_lb_listener" "internal_http" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.internal_ecs.arn
  }
}
