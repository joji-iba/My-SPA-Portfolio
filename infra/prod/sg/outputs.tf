output "alb_security_group_id" {
  value       = module.security.alb_security_group_id
  description = "ALB SG ID"
}

output "alb_internal_security_group_id" {
  value       = module.security.alb_internal_security_group_id
  description = "Internal ALB SG ID"
}

output "bastion_security_group_id" {
  value       = module.security.bastion_security_group_id
  description = "Bastion SG ID"
}

output "vpc_endpoint_security_group_id" {
  value       = module.security.vpc_endpoint_security_group_id
  description = "VPC endpoint SG ID"
}

output "ecs_service_security_group_id" {
  value       = module.security.ecs_service_security_group_id
  description = "ECS Fargate service SG ID"
}

output "db_security_group_id" {
  value       = module.security.db_security_group_id
  description = "RDS PostgreSQL SG ID"
}
