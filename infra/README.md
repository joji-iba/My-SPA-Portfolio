# Portfolio Backend Infrastructure

このディレクトリには、Go/GinバックエンドAPIをAWS ECS FargateにデプロイするためのTerraformコードが含まれています。

## 構成

- **ECS Fargate**: スケーラブルなコンテナ実行環境
- **RDS PostgreSQL**: マネージドデータベース
- **Application Load Balancer**: トラフィック分散
- **VPC**: セキュアなネットワーク
- **ECR**: Dockerイメージレジストリ

## デプロイ手順

1. **操作方法**
   ```bash
   # AWS CLI設定
   aws configure

   # 初期化（各サービスディレクトリで実行）
   terraform init

   # フォーマット（ルートディレクトリで一括実行）
   cd ./infra
   terraform fmt -recursive

   # 構文エラーチェック（init済みの各ディレクトリで実行）
   cd ./infra/...
   terraform validate

   # plan
   terraform plan

   # apply
   terraform apply

   # destroy plan
   terraform plan destroy

   # destroy
   terraform destroy
   ```

2. **ECRリポジトリ作成**
   ```bash
   terraform apply -target=module.ecr
   ```

3. **Dockerイメージのビルドとプッシュ**
   ```bash
   # ECRログイン
   aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com

   # イメージビルドとプッシュ
   ./scripts/deploy.sh staging
   ```

4. **インフラ全体のデプロイ**
   ```bash
   terraform apply
   ```

## 環境

- **prod**: 本番環境
- **staging**: 開発・テスト環境（未実装）
