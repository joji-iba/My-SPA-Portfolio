output "db_endpoint" {
  description = "RDS endpoint address"
  value       = aws_db_instance.this.address
}

output "db_port" {
  description = "RDS endpoint port"
  value       = aws_db_instance.this.port
}

output "db_name" {
  description = "Initial database name"
  value       = aws_db_instance.this.db_name
}

output "db_instance_arn" {
  description = "ARN of the RDS instance"
  value       = aws_db_instance.this.arn
}

output "db_secret_arn" {
  description = "The ARN of the Secrets Manager secret that stores DATABASE_URL for this RDS instance"
  value       = var.create_db_secret ? aws_secretsmanager_secret.database_url[0].arn : null
}
