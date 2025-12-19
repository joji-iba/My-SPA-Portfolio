variable "environment" {
  type        = string
  description = "Environment name (e.g. prod)"
  default     = "prod"
}

variable "domain_name" {
  type        = string
  description = "ACM certificate domain name"
}

variable "hosted_zone_name" {
  type        = string
  description = "Public hosted zone name for Route53 (must end with a dot)"
}
