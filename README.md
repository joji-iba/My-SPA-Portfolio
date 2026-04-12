# Full-Stack Portfolio

URL：https://joji-iba-portfolio.vercel.app/

This is a micro service architecture-oriented SPA configuration with loosely coupled frontend and backend separation. The backend is deployed on AWS ECS Fargate using Terraform as an API server. The frontend is deployed on Vercel.

Please log in with your Google account because I've implemented the authentication function with Firebase.

For cost savings, I have currently turned off AWS VPC-endpoints. Therefore, API responses for `/projects` is currently stopped.

| Category       | Stack                               |
| :------------- | :--------------------------------- |
| **Backend**    | Go/Gin, GORM, PostgreSQL, Firebase |
| **Frontend**   | React/Next.js(App Router), TypeScript, Tailwind CSS |
| **Infrastructure**      | Docker, AWS（VPC、IAM、ECR、ECS Fargate、EC2、S3、ALB、RDS、Secrets Manager、Route53、ACM、CloudWatch）、Terraform、Vercel             |

<img src="infra/infra-architecture.svg">

## ✨ 主な特徴

- **クリーンなバックエンドアーキテクチャ**: Go:version1.25、保守性・テスト容易性を重視したレイヤードアーキテクチャを採用。
- **モダンなフロントエンド**: Next.js 16 (App Router) と TypeScript による型安全で効率的なモダン開発。
- **コンテナベースの開発環境**: Docker Compose により、誰でもすぐに同じ環境を再現可能。
- **疎結合な構成**: フロントエンドとバックエンドの関心を完全に分離し、独立した開発・デプロイが可能。

---

## 🚀 バックエンドアーキテクチャ (Go / Gin)

このプロジェクトのバックエンドは、単に動作するだけでなく、**将来の拡張性と保守性**を最優先に考慮して設計されています。Go言語と軽量なWebフレームワークGinを採用し、以下のクリーンな**レイヤードアーキテクチャ**を実装しています。

```
/backend
├── cmd/              # アプリケーションのエントリーポイント（main + seed）
└── internal/
    ├── config/       # 環境変数の読み込みとデフォルト値管理
    ├── database/     # DB接続・接続プール設定・マイグレーション
    ├── handlers/     # プレゼンテーション層 (HTTP)
    ├── middleware/   # CORSなどのHTTPミドルウェア
    ├── models/       # ドメインモデル
    ├── repository/   # データアクセス層 (Database)
    ├── server/       # Ginルーター初期化・ルート登録
    └── service/      # ビジネスロジック層 (Core Logic)
```

### 各レイヤー・パッケージの責務

1.  **`handlers` (プレゼンテーション層)**
    *   **役割**: HTTPリクエストの受付とレスポンスの返却に特化します。
    *   **責務**: リクエストボディのパース、バリデーション、そして`service`層への処理の委譲のみを行います。ビジネスロジックは一切含みません。
    *   **セキュリティ**: 内部エラーはクライアントに漏洩させず、汎用メッセージのみ返却します。

2.  **`service` (ビジネスロジック層)**
    *   **役割**: このアプリケーションの**核心**です。
    *   **責務**: 「プロジェクトを登録する」といったユースケースを実装します。フレームワークやデータベースなどのインフラストラクチャから完全に独立しており、純粋なGoのコードで記述されています。

3.  **`repository` (データアクセス層)**
    *   **役割**: データベースとの全てのやり取りを抽象化します。
    *   **責務**: `service`層からの要求に応じて、GORM v2 で `context.Context` 付きのクエリを実行し、Goの構造体 (`models`) との間でデータのマッピングを行います。

4.  **`config` / `database` / `middleware` / `server` (インフラストラクチャ層)**
    *   **`config`**: 環境変数の読み込みとデフォルト値管理。`ALLOW_ORIGIN` 等の設定を構造体にマッピングします。
    *   **`database`**: DB接続・接続プール設定・Ping による疎通検証・マイグレーション。cleanup関数パターンで安全なリソース解放を保証します。
    *   **`middleware`**: CORS ヘッダー設定（`Vary: Origin` によるキャッシュポイズニング対策含む）。
    *   **`server`**: Gin ルーター初期化・ヘルスチェック・ルート登録。handler 型に依存しない疎結合設計。

### なぜこのアーキテクチャなのか？

この設計は、以下の重要な利点をもたらします。

- **高い保守性**: 各レイヤーの関心が分離されているため、仕様変更や機能追加の影響範囲を特定しやすく、安全にコードを修正できます。
- **テスト容易性**: **依存性逆転の原則 (DIP)** に基づき、各レイヤーの境界にインターフェースを導入。`repository`をモックに差し替えることで、データベースなしに単体テストを実行できます（現在35件以上のテスト）。
- **柔軟性と拡張性**: 将来的にデータベースをPostgreSQLから別のものに移行する場合でも、修正は`repository`層に限定されます。また、gRPCのような別のプロトコルを追加する場合も、`handlers`層を差し替えるだけで対応可能です。
- **セキュリティ**: 内部エラーメッセージのクライアント漏洩防止、CORS の適切な設定、Gin リリースモードのデフォルト適用など、OWASP ガイドラインに沿ったセキュリティ対策を実装しています。

---

## 🏁 ローカルでの起動方法

### 1. 前提条件
- Git
- Docker
- Docker Compose

### 2. セットアップ

1.  リポジトリをクローンします。
    ```bash
    git clone https://github.com/your-username/2023_nextjs_portfolio.git
    cd 2023_nextjs_portfolio
    ```

2.  環境変数を設定します。
    `backend/` ディレクトリに `.env` ファイルを作成し、データベースの接続情報などを記述してください。

3.  Dockerコンテナをビルドして起動します。
    ```bash
    docker compose up --build -d
    ```

4.  ブラウザでアクセスします。
    - フロントエンド: `http://localhost:3000`
    - バックエンドAPI: `http://localhost:8080`
