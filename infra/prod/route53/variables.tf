variable "environment" {
  type        = string
  description = "Environment name (e.g. prod)"
  default     = "prod"
}

variable "hosted_zone_name" {
  type        = string
  description = "Public hosted zone name for Route53 (must end with a dot)"
}

variable "record_name" {
  type        = string
  description = "Record name for the API endpoint (empty string for zone apex)"
  default     = ""
}
