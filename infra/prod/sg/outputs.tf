output "alb_security_group_id" {
  value       = module.security.alb_security_group_id
  description = "ALB SG ID"
}

output "bastion_security_group_id" {
  value       = module.security.bastion_security_group_id
  description = "Bastion SG ID"
}
