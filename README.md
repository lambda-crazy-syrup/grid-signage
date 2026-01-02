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

```
grid-signage/
├── apps/
│   └── signage-host/    # メインアプリ
│       ├── src/         # ソースコード
│       ├── sample/      # サンプルアプレット
│       └── apps.json    # アプレット設定
├── packages/
│   └── core/            # 共有コアライブラリ（将来用）
└── package.json         # ルート設定
```

## ライセンス

Private
