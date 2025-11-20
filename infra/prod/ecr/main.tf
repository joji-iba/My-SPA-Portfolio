terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/ecr/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

module "ecr_web" {
  source               = "../../modules/ecr"
  name                 = var.repository_name
  environment          = var.environment
  image_tag_mutability = var.image_tag_mutability // 意図しないタグの上書きを防止
  scan_on_push         = var.scan_on_push
  lifecycle_keep       = var.lifecycle_keep
}
