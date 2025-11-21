variable "allowed_ssh_cidrs" {
  type        = list(string)
  description = "SSH許可CIDR一覧"
  default     = []
}
