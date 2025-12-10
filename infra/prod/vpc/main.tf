terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/vpc/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

module "vpc" {
  source = "../../modules/vpc"

  name        = "portfolio"
  environment = "prod"

  // prod用のCIDRブロック
  vpc_cidr = "10.0.0.0/16"

  availability_zones = [
    "ap-northeast-1a",
    "ap-northeast-1c",
  ]

  public_subnet_cidrs = [
    "10.0.0.0/20",
    "10.0.16.0/20",
  ]

  private_subnet_cidrs = [
    "10.0.64.0/20",
    "10.0.80.0/20",
  ]

  # 開発中はNAT Gatewayを無効化してコスト削減
  enable_nat_gateway = false

  # Private subnet から ECR/S3/CloudWatch へ出られるよう VPC Endpoint を有効化（開発中はVPC Endpointも一旦無効化しておく）
  enable_interface_endpoints = false
  enable_gateway_endpoints   = false

  interface_endpoint_security_group_id = data.terraform_remote_state.sg.outputs.vpc_endpoint_security_group_id
}

data "terraform_remote_state" "sg" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/sg/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
