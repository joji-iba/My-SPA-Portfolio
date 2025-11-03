variable "name" {
  description = "Name prefix"
  type        = string
}

variable "environment" {
  description = "環境名 (例: prod, staging)"
  type        = string
}

variable "enable_bastion" {
  description = "踏み台サーバー用EC2を作成するかどうか"
  type        = bool
  default     = false
}

variable "subnet_id" {
  description = "踏み台サーバーのサブネットID"
  type        = string
}

variable "security_group_id" {
  description = "踏み台サーバーのセキュリティグループID"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = ""
}

variable "allocate_eip" {
  description = "踏み台サーバー用にEIPを割り当てるかどうか"
  type        = bool
  default     = true
}

variable "ami_name_pattern" {
  description = "AMI name filter pattern"
  type        = string
  default     = "al2023-ami-*-x86_64"
}
