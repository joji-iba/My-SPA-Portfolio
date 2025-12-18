output "db_endpoint" {
  description = "RDS endpoint address"
  value       = module.rds.db_endpoint
}

output "db_port" {
  description = "RDS endpoint port"
  value       = module.rds.db_port
}

output "db_name" {
  description = "Initial database name"
  value       = module.rds.db_name
}

output "db_secret_arn" {
  description = "The ARN of the Secrets Manager secret that stores DATABASE_URL for this RDS instance"
  value       = module.rds.db_secret_arn
}
