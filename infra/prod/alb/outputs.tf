output "external_alb_dns_name" {
  description = "外部向けALBのDNS名"
  value       = module.alb.external_alb_dns_name
}

output "external_alb_zone_id" {
  description = "外部向けALBのホストゾーンID"
  value       = module.alb.external_alb_zone_id
}

output "internal_alb_dns_name" {
  description = "内部向けALBのDNS名"
  value       = module.alb.internal_alb_dns_name
}

output "external_target_group_arn" {
  description = "外部向けALB -> ECSのターゲットグループARN"
  value       = module.alb.external_target_group_arn
}

output "internal_target_group_arn" {
  description = "内部向けALB -> ECSのターゲットグループARN"
  value       = module.alb.internal_target_group_arn
}
