output "external_alb_dns_name" {
  description = "外部向けALBのDNS名"
  value       = aws_lb.external.dns_name
}

output "external_alb_zone_id" {
  description = "外部向けALBのホストゾーンID"
  value       = aws_lb.external.zone_id
}

output "external_alb_arn" {
  description = "外部向けALBのARN"
  value       = aws_lb.external.arn
}

output "internal_alb_dns_name" {
  description = "内部向けALBのDNS名"
  value       = aws_lb.internal.dns_name
}

output "internal_alb_arn" {
  description = "内部向けALBのARN"
  value       = aws_lb.internal.arn
}

output "external_target_group_arn" {
  description = "外部向けALB -> ECSのターゲットグループARN"
  value       = aws_lb_target_group.external_ecs.arn
}

output "internal_target_group_arn" {
  description = "内部向けALB -> ECSのターゲットグループARN"
  value       = aws_lb_target_group.internal_ecs.arn
}
