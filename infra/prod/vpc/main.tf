terraform {
  required_version = ">= 1.5.0"
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
}
