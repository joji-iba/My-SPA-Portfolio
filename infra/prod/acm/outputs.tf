output "certificate_arn" {
  description = "Validated ACM certificate ARN for the API domain"
  value       = aws_acm_certificate_validation.this.certificate_arn
}
