# Portfolio API (FastAPI)

ポートフォリオ用の軽量 FastAPI バックエンド。最小構成としてスキル配列を返すエンドポイントのみ実装済みですが、今後プロジェクト情報やブログ記事などに発展させる前提で Docker / FastAPI の基本土台を用意しています。

## 技術スタック
- Python 3.12
- FastAPI + Uvicorn
- Docker / Docker Compose（本番・検証用）

## 提供エンドポイント
| Method | Path          | Summary                         |
|--------|---------------|---------------------------------|
| GET    | `/api/skills` | サンプルのスキル配列を返す（初期実装） |

将来的に `/api/projects`、`/api/posts` などを追加する想定です。

FastAPI 標準のドキュメントも利用可能です。
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 環境変数
`portfolio_back/.env` に設定し、Docker Compose でもそのまま読み込みます。
```
PORT=8000        # 公開ポート（未設定時は 8000）
LOG_LEVEL=info   # Uvicorn ログレベル
```

## ローカル開発
依存インストール:
```bash
pip install -r requirements.txt
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

## ディレクトリ構成
```
portfolio_back/
├── app/
│   ├── __init__.py
│   └── main.py        # FastAPI アプリ本体（CORS + 現行API）
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env
└── README.md
```

## カスタマイズのヒント
- `app/main.py` の FastAPI インスタンスにルーターを追加して任意の API を増やせます。
- 既存の `DEFAULT_SKILLS` 配列はダミーデータなので、別データソースに置き換えても構いません。
- CORS 設定は `allow_origins` にデプロイ先フロントを指定してください。
- モジュール分割する場合は `app` 配下にパッケージを切り出し、`app/main.py` からインポートします。

## トラブルシュート
- 8000 番が使われている → `.env` の `PORT` を別番号に変更。
- 変更が反映されない → 開発時は `uvicorn --reload` を使用。
- Docker ビルドが遅い → `requirements.txt` を先に COPY しているので、依存を触らない限りキャッシュが効きます。
