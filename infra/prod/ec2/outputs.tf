output "bastion_instance_id" {
  value       = module.bastion.bastion_instance_id
  description = "Bastion instance ID"
}

output "bastion_public_ip" {
  value       = module.bastion.bastion_public_ip
  description = "Bastion public IP"
}

output "bastion_eip_id" {
  value       = module.bastion.bastion_eip_id
  description = "Elastic IP allocation ID"
}
