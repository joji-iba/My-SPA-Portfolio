variable "repository_name" {
  type        = string
  description = "ECRリポジトリ名"
  default     = "portfolio-web"
}

variable "environment" {
  type        = string
  description = "デプロイ環境名"
  default     = "prod"
}

variable "image_tag_mutability" {
  type        = string
  description = "ECRタグのミュータビリティ (MUTABLE or IMMUTABLE)"
  default     = "IMMUTABLE"
}

variable "scan_on_push" {
  type        = bool
  description = "push時の脆弱性スキャンを有効化するか"
  default     = true
}

variable "lifecycle_keep" {
  type        = number
  description = "保持する最新イメージ数"
  default     = 10
}
