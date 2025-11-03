output "bastion_instance_id" {
  value       = try(aws_instance.bastion[0].id, null)
  description = "踏み台サーバーインスタンスID"
}

output "bastion_public_ip" {
  value       = try(aws_instance.bastion[0].public_ip, null)
  description = "踏み台サーバーパブリックIPアドレス"
}

output "bastion_eip_id" {
  value       = try(aws_eip.bastion[0].id, null)
  description = "踏み台サーバー用EIPのID"
}
