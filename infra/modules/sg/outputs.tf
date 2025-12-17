output "alb_security_group_id" {
  description = "ALB用セキュリティグループID"
  value       = aws_security_group.alb.id
}

output "alb_internal_security_group_id" {
  description = "内部ALB用セキュリティグループID"
  value       = aws_security_group.alb_internal.id
}

output "bastion_security_group_id" {
  description = "踏み台サーバー用セキュリティグループID"
  value       = try(aws_security_group.bastion[0].id, null)
}

output "vpc_endpoint_security_group_id" {
  description = "VPCエンドポイント用セキュリティグループID"
  value       = try(aws_security_group.vpc_endpoints[0].id, null)
}

output "ecs_service_security_group_id" {
  value       = aws_security_group.ecs_service.id
  description = "ECS Fargateサービス用のセキュリティグループID"
}

output "db_security_group_id" {
  description = "RDS PostgreSQL用セキュリティグループID"
  value       = aws_security_group.db.id
}
