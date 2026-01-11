# Portfolio API (FastAPI)

ポートフォリオ用の FastAPI バックエンド。スキル、プロジェクト、職務経歴情報を管理する API と、管理画面用の認証機能を提供します。

## 技術スタック
- Python 3.12
- FastAPI + Uvicorn
- PostgreSQL + SQLAlchemy
- JWT 認証 (python-jose, passlib)
- Docker / Docker Compose（本番・検証用）

## 提供エンドポイント
| Method | Path          | Summary                         | 認証 |
|--------|---------------|---------------------------------|------|
| GET    | `/api/skills` | スキル一覧を取得 | 不要 |
| POST   | `/api/skills` | スキルを作成 | 必要 |
| DELETE | `/api/skills/{name}` | スキルを削除 | 必要 |
| GET    | `/api/projects` | プロジェクト一覧を取得 | 不要 |
| POST   | `/api/projects` | プロジェクトを作成 | 必要 |
| PUT    | `/api/projects/{id}` | プロジェクトを更新 | 必要 |
| DELETE | `/api/projects/{id}` | プロジェクトを削除 | 必要 |
| GET    | `/api/jobs` | 職務経歴一覧を取得 | 不要 |
| POST   | `/api/jobs` | 職務経歴を作成 | 必要 |
| PUT    | `/api/jobs/{id}` | 職務経歴を更新 | 必要 |
| DELETE | `/api/jobs/{id}` | 職務経歴を削除 | 必要 |
| POST   | `/api/auth/login` | 管理者ログイン | 不要 |

FastAPI 標準のドキュメントも利用可能です。
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 環境変数
`.env.example` をコピーして `.env` ファイルを作成し、必要な環境変数を設定してください。

重要な環境変数:
- `JWT_SECRET_KEY`: JWT トークンの署名に使用する秘密鍵（本番環境では強力なランダム文字列に変更）
- `ADMIN_USERNAME`: 初期管理者ユーザー名
- `ADMIN_PASSWORD`: 初期管理者パスワード（本番環境では強力なパスワードに変更）
- `DATABASE_URL`: PostgreSQL 接続 URL

## ローカル開発
依存インストール:
```bash
pip install -r requirements.txt
```

環境変数設定:
```bash
cp .env.example .env
# .env ファイルを編集して適切な値を設定
```

ホットリロード付き起動:
```bash
uvicorn app.main:app --reload --env-file .env
```

## Docker コンテナでの実行
```bash
docker compose up --build
```
停止は `docker compose down`。ログ確認は `docker compose logs -f skills-api`。

## 認証について
管理画面（POST/PUT/DELETE 操作）を使用するには、まず `/api/auth/login` でログインしてアクセストークンを取得してください。

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

取得したトークンを `Authorization: Bearer {token}` ヘッダーに含めて API リクエストを送信します。

## ディレクトリ構成
```
portfolio_back/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI アプリ本体
│   ├── api/
│   │   ├── deps.py          # 依存性注入（認証含む）
│   │   └── v1/              # API v1 エンドポイント
│   │       ├── auth.py
│   │       ├── jobs.py
│   │       ├── projects.py
│   │       └── skills.py
│   ├── core/
│   │   └── config.py        # 設定（CORS含む）
│   ├── db/
│   │   ├── base.py          # DB セッション
│   │   └── models.py        # SQLAlchemy モデル
│   ├── repositories/        # データアクセス層
│   ├── schemas/             # Pydantic スキーマ
│   └── services/            # ビジネスロジック層
├── scripts/
│   └── seed.py              # 初期データ投入
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

## セキュリティ
- 本番環境では必ず `JWT_SECRET_KEY` を強力なランダム文字列に変更してください
- デフォルトの管理者パスワードを変更してください
- CORS 設定で許可するオリジンを限定してください
