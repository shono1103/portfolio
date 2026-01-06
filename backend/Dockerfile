# ベースイメージ（軽量）
FROM python:3.12-slim

# 1) ランタイム挙動を安定化
ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1 \
	PIP_DISABLE_PIP_VERSION_CHECK=1 \
	PIP_NO_CACHE_DIR=1 \
	PYTHONPATH=/app

# 2) 非rootユーザーを先に作っておく
RUN useradd -m -u 10001 appuser

# 3) 作業ディレクトリ
WORKDIR /app

# 4) 依存だけ先にコピー → レイヤーキャッシュ最大化
COPY requirements.txt .

# 5) 依存インストール（wheel優先）
#    psycopg2-binary を使うなら追加のOS依存は基本不要
RUN pip install --no-cache-dir --upgrade pip && \
	pip install --no-cache-dir --prefer-binary -r requirements.txt

# 6) アプリ本体はオーナー付きでコピー（権限トラブル防止）
COPY --chown=appuser:appuser app ./app
COPY --chown=appuser:appuser scripts ./scripts

# 7) 権限を固める
RUN chmod -R a-w /app && chmod -R u+w /app

# 8) 実行ユーザー
USER appuser

# 9) ポート公開
EXPOSE 8000

# 10) 起動コマンド（本番向けに少しだけ堅めのフラグ）
# --proxy-headers: 逆プロキシ越しヘッダ尊重
# --forwarded-allow-ips='*': 逆プロキシのX-Forwarded-*許可（必要に応じて絞る）
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "*"]
