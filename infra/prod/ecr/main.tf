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
  source             = "../../modules/ecr"
  name               = "portfolio-web"
  environment        = "prod"
  image_tag_mutability = "MUTABLE"
  scan_on_push       = true
  lifecycle_keep     = 10
}
