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
