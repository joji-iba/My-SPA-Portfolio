output "api_domain_name" {
  description = "Public API domain name"
  value       = aws_route53_record.root.fqdn
}
