terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/route53/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

data "aws_route53_zone" "primary" {
  name         = var.hosted_zone_name
  private_zone = false
}

data "terraform_remote_state" "alb" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/alb/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

resource "aws_route53_record" "root" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.record_name
  type    = "A"

  alias {
    name                   = data.terraform_remote_state.alb.outputs.external_alb_dns_name
    zone_id                = data.terraform_remote_state.alb.outputs.external_alb_zone_id
    evaluate_target_health = true
  }
}
