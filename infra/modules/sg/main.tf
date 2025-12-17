resource "aws_security_group" "alb" {
  name        = "${var.name}-alb-sg"
  description = "ALB security group"
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.allowed_http_cidrs
    content {
      description = "Allow HTTP"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  dynamic "ingress" {
    for_each = var.allowed_https_cidrs
    content {
      description = "Allow HTTPS"
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name}-alb-sg"
    Environment = var.environment
    Component   = "alb"
  }
}

resource "aws_security_group" "alb_internal" {
  name        = "${var.name}-alb-internal-sg"
  description = "Internal ALB security group"
  vpc_id      = var.vpc_id

  # 内部ALBは通常VPC内からのアクセスのみを想定するため、デフォルトではVPC CIDRを許可しておく
  ingress {
    description = "Allow HTTP from within VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name}-alb-internal-sg"
    Environment = var.environment
    Component   = "alb-internal"
  }
}

resource "aws_security_group" "bastion" {
  count       = var.enable_bastion ? 1 : 0
  name        = "${var.name}-bastion-sg"
  description = "Bastion host security group"
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.allowed_ssh_cidrs
    content {
      description = "SSH access"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name}-bastion-sg"
    Environment = var.environment
    Component   = "bastion"
  }
}

resource "aws_security_group" "ecs_service" {
  name        = "${var.name}-ecs-service-sg"
  description = "Security group for ECS Fargate service"
  vpc_id      = var.vpc_id

  ingress {
    # ALB 経由のトラフィックのみを許可し、本番構成に近づける
    # 外向き ALB / 内向き ALB いずれからの 8080/TCP を許可する
    description = "Allow HTTP from ALBs only"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    security_groups = [
      aws_security_group.alb.id,
      aws_security_group.alb_internal.id,
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name}-ecs-service-sg"
    Environment = var.environment
    Component   = "ecs-service"
  }
}

locals {
  endpoint_ingress_cidrs = length(var.vpc_endpoint_allowed_cidrs) > 0 ? var.vpc_endpoint_allowed_cidrs : (var.vpc_cidr_block != "" ? [var.vpc_cidr_block] : [])

  db_allowed_sg_ids = concat(
    [aws_security_group.ecs_service.id],
    var.enable_bastion ? [aws_security_group.bastion[0].id] : [],
  )
}

resource "aws_security_group" "vpc_endpoints" {
  count       = var.enable_vpc_endpoint_sg ? 1 : 0
  name        = "${var.name}-endpoints-sg"
  description = "Security group for VPC interface endpoints"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTPS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = local.endpoint_ingress_cidrs
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name}-vpc-endpoints-sg"
    Environment = var.environment
    Component   = "vpc-endpoints"
  }
}

resource "aws_security_group" "db" {
  name        = "${var.name}-db-sg"
  description = "Security group for RDS PostgreSQL"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow PostgreSQL from ECS service and Bastion"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = local.db_allowed_sg_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name}-db-sg"
    Environment = var.environment
    Component   = "db"
  }
}
