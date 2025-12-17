resource "aws_db_subnet_group" "this" {
  name       = "${var.name}-${var.environment}-db-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name        = "${var.name}-${var.environment}-db-subnet-group"
    Environment = var.environment
    Component   = "db-subnet-group"
  }
}

resource "aws_db_instance" "this" {
  identifier_prefix        = "${var.name}-${var.environment}-pg-"
  engine                   = "postgres"
  engine_version           = var.engine_version
  instance_class           = var.instance_class
  allocated_storage        = var.allocated_storage
  storage_type             = "gp3"
  db_subnet_group_name     = aws_db_subnet_group.this.name
  vpc_security_group_ids   = [var.db_security_group_id]
  db_name                  = var.db_name
  username                 = var.master_username
  password                 = var.master_password
  port                     = 5432
  publicly_accessible      = false
  multi_az                 = var.multi_az
  backup_retention_period  = var.backup_retention_period
  copy_tags_to_snapshot    = true
  auto_minor_version_upgrade = true
  apply_immediately        = true
  deletion_protection      = var.deletion_protection
  skip_final_snapshot      = var.skip_final_snapshot

  tags = {
    Name        = "${var.name}-${var.environment}-postgres"
    Environment = var.environment
    Component   = "db"
  }
}
