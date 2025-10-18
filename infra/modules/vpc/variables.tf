variable "name" {
  description = "Name prefix for resources"
  type        = string
}

variable "environment" {
  description = "Environment (staging, prod)"
  type        = string
}

variable "vpc_cidr" {
  description = "VPCのIPアドレス範囲"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "アベイラビリティゾーン"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "パブリックサブネットのIPアドレス範囲"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "プライベートサブネットのIPアドレス範囲"
  type        = list(string)
}

variable "enable_nat_gateway" {
  description = "NAT Gatewayを有効にするかどうか"
  type        = bool
  default     = true
}
