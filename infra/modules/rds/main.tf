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
  identifier_prefix          = "${var.name}-${var.environment}-pg-"
  engine                     = var.engine
  engine_version             = var.engine_version
  instance_class             = var.instance_class
  allocated_storage          = var.allocated_storage
  storage_type               = var.storage_type
  db_subnet_group_name       = aws_db_subnet_group.this.name
  vpc_security_group_ids     = [var.db_security_group_id]
  db_name                    = var.db_name
  username                   = var.master_username
  password                   = var.master_password
  port                       = var.port
  publicly_accessible        = var.publicly_accessible
  multi_az                   = var.multi_az
  backup_retention_period    = var.backup_retention_period
  copy_tags_to_snapshot      = var.copy_tags_to_snapshot
  auto_minor_version_upgrade = var.auto_minor_version_upgrade
  apply_immediately          = var.apply_immediately
  deletion_protection        = var.deletion_protection
  skip_final_snapshot        = var.skip_final_snapshot

  tags = {
    Name        = "${var.name}-${var.environment}-postgres"
    Environment = var.environment
    Component   = "db"
  }
}

locals {
  database_url = format(
    "postgres://%s:%s@%s:%d/%s",
    var.master_username,
    var.master_password,
    aws_db_instance.this.address,
    var.port,
    var.db_name,
  )
}

resource "aws_secretsmanager_secret" "database_url" {
  count = var.create_db_secret ? 1 : 0

  name = var.db_secret_name != "" ? var.db_secret_name : "rds/${var.db_name}/database_url"
}

resource "aws_secretsmanager_secret_version" "database_url" {
  count = var.create_db_secret ? 1 : 0

  secret_id     = aws_secretsmanager_secret.database_url[0].id
  secret_string = local.database_url
}
