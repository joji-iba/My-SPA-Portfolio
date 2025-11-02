variable "name" {
  description = "プロジェクトのベース名 (例: portfolio)"
  type        = string
}

variable "environment" {
  description = "環境名 (例: prod, staging)"
  type        = string
}

variable "vpc_id" {
  description = "関連付けるVPCのID"
  type        = string
}

variable "allowed_http_cidrs" {
  description = "ALBにHTTP(80)でアクセスを許可するCIDR一覧"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "allowed_https_cidrs" {
  description = "ALBにHTTPS(443)でアクセスを許可するCIDR一覧"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "allowed_ssh_cidrs" {
  description = "踏み台EC2にSSH(22)アクセスを許可するCIDR一覧"
  type        = list(string)
  default     = []
}

variable "enable_bastion" {
  description = "踏み台サーバー用SGを作成するかどうか"
  type        = bool
  default     = false
}
