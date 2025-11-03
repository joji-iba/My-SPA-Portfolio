output "alb_security_group_id" {
  description = "ALB用セキュリティグループID"
  value       = aws_security_group.alb.id
}

output "bastion_security_group_id" {
  description = "踏み台サーバー用セキュリティグループID"
  value       = try(aws_security_group.bastion[0].id, null)
}
