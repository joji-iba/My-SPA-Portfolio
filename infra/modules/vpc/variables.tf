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

variable "enable_interface_endpoints" {
  description = "ECR / CloudWatch Logs 用のインターフェース型 VPC Endpoint を作成するか"
  type        = bool
  default     = false
}

variable "enable_gateway_endpoints" {
  description = "S3 ゲートウェイエンドポイントを作成するか"
  type        = bool
  default     = false
}

variable "interface_endpoint_security_group_id" {
  description = "インターフェース型VPCエンドポイントで使用するセキュリティグループID"
  type        = string
  default     = null

  validation {
    condition     = !(var.enable_interface_endpoints && var.interface_endpoint_security_group_id == null)
    error_message = "enable_interface_endpoints=true の場合、interface_endpoint_security_group_id を指定してください"
  }
}
