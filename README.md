# grid-signage

グリッドベースのサイネージシステム。iframeを使用して複数のアプレットをグリッドレイアウトで配置・管理します。

## セットアップ

### 前提条件

- [Bun](https://bun.sh/) がインストールされていること

### インストール

```bash
bun install
```

## 開発

### 開発サーバーの起動

```bash
bun run dev
```

### ビルド

```bash
bun run build
```

### ビルド成果物のホスト

```bash
bun run preview
```

### 型チェック

```bash
bun run type-check
```

## プロジェクト構造

```text
grid-signage/
├── apps/
│   └── signage-host/    # メインアプリ
│       ├── applets/      # ローカルアプレット
│       │   └── sample/   # サンプルアプレット
│       ├── src/         # ソースコード
│       └── apps.json    # アプレット設定
├── packages/
│   └── core/            # 共有コアライブラリ（将来用）
└── package.json         # ルート設定
```

## アプレットの管理

すべてのアプレット（ローカルアプレットと外部URL）は`apps/signage-host/apps.json`で管理。

### ローカルアプレットの追加

1. `apps/signage-host/applets/`配下に新しいディレクトリを作成
2. `index.html`ファイルを作成
3. `apps.json`にエントリを追加

### 外部URLの追加

`apps.json`に外部URLを直接指定できます。