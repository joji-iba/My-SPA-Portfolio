output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}

output "nat_gateway_ids" {
  description = "IDs of the NAT Gateways"
  value       = aws_nat_gateway.main[*].id
}

output "vpc_endpoint_ids" {
  description = "IDs of created VPC endpoints"
  value = {
    ecr_api        = aws_vpc_endpoint.ecr_api[*].id
    ecr_dkr        = aws_vpc_endpoint.ecr_dkr[*].id
    cloudwatch_log = aws_vpc_endpoint.cloudwatch_logs[*].id
    s3_gateway     = aws_vpc_endpoint.s3[*].id
  }
}
