variable "name" {
  type        = string
  description = "Base name for ALB resources (e.g. portfolio)"
}

variable "environment" {
  type        = string
  description = "Environment name (e.g. prod, staging)"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID where ALBs will be created"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "Subnet IDs for the internet-facing ALB (public subnets)"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "Subnet IDs for the internal ALB (private subnets)"
}

variable "external_alb_security_group_id" {
  type        = string
  description = "Security group ID for internet-facing ALB"
}

variable "internal_alb_security_group_id" {
  type        = string
  description = "Security group ID for internal ALB (can be same as external for now)"
}

variable "vpc_cidr_block" {
  type        = string
  description = "VPC CIDR block (used for health check / future SG restrictions)"
}

variable "target_port" {
  type        = number
  description = "Port on ECS tasks to register in target groups (e.g. 8080)"
}

variable "health_check_path" {
  type        = string
  description = "Health check path for target groups"
  default     = "/api/health"
}

variable "enable_https_external" {
  type        = bool
  description = "Whether to create HTTPS listener for internet-facing ALB"
  default     = false
}

variable "external_certificate_arn" {
  type        = string
  description = "ACM certificate ARN for internet-facing ALB HTTPS listener (optional for now)"
  default     = ""
}
