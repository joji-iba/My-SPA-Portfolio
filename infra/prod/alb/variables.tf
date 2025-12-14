variable "environment" {
  type        = string
  description = "Environment name (e.g. prod)"
  default     = "prod"
}

variable "enable_https_external" {
  type        = bool
  description = "Whether to create HTTPS listener for internet-facing ALB"
  default     = false
}

variable "external_certificate_arn" {
  type        = string
  description = "ACM certificate ARN for external ALB HTTPS listener (set later when ACM is ready)"
  default     = ""
}
