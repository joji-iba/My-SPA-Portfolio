variable "name"        { type = string }
variable "environment" { type = string }
variable "image_tag_mutability" {
  type    = string
  default = "MUTABLE"
}
variable "scan_on_push" {
  type    = bool
  default = true
}
variable "lifecycle_keep" {
  type    = number
  default = 10
}
