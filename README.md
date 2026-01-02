# grid-signage

![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.2-000000?logo=bun&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4.3-3E63DD?logo=zod)

グリッドベースのサイネージシステム。iframeを使用して複数のアプレットをグリッドレイアウトで配置・管理します。

## 技術スタック

- **ランタイム**: [Bun](https://bun.sh/)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **言語**: TypeScript
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) v4.1
- **バリデーション**: [Zod](https://zod.dev/)
- **アーキテクチャ**: Monorepo (Bun Workspaces)

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

開発サーバーは `http://localhost:5173` で起動します。

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
│   └── signage-host/           # メインアプリ
│       ├── applets/             # ローカルアプレット
│       │   └── sample/          # サンプルアプレット
│       ├── src/
│       │   ├── main.ts         # エントリーポイント
│       │   ├── types.ts         # 型定義
│       │   ├── AppletFrames.ts  # アプレット管理クラス
│       │   └── lib/
│       │       ├── constants.ts # 定数定義
│       │       ├── grid.ts      # グリッドサイズ計算
│       │       ├── applets/     # アプレット読み込み・管理
│       │       ├── config/      # 設定適用
│       │       ├── events/      # イベントハンドリング
│       │       ├── iframe/      # iframe関連処理
│       │       └── utils/       # ユーティリティ（エラーハンドリング等）
│       ├── apps.json            # アプレット設定
│       └── package.json
├── packages/
│   └── core/                    # 共有コアライブラリ（将来用）
└── package.json                  # ルート設定
```

## アプレットの管理

すべてのアプレット（ローカルアプレットと外部URL）は`apps/signage-host/apps.json`で管理します。

### apps.jsonの形式

```json
[
  {
    "src": "applets/sample/index.html",
    "name": "sample",
    "id": "item1"
  },
  {
    "src": "https://www.example.com/",
    "name": "external-app",
    "id": "item2"
  }
]
```

- `src`: アプレットのURLまたはローカルパス（`applets/`で始まる）
- `name`: アプレット名（識別用）
- `id`: iframe要素のID（オプション）

### ローカルアプレットの追加

1. `apps/signage-host/applets/`配下に新しいディレクトリを作成
2. `index.html`ファイルを作成
3. `apps.json`にエントリを追加

### 外部URLの追加

`apps.json`に外部URLを直接指定できます。

## アプレットの開発

### アプレットからの設定送信

アプレットは`postMessage`を使用してグリッド配置とサイズを指定します。

```javascript
const config = {
  grid_column: 3,    // グリッド列位置
  grid_row: 9,       // グリッド行位置
  width: 2,          // グリッドセル幅
  height: 2,         // グリッドセル高さ
  cell_size: 200,    // アプレット内のセルサイズ（ピクセル）
};

window.addEventListener("load", () => {
  window.parent.postMessage({
    type: "config",
    content: config
  });
});
```

### 型定義

TypeScriptを使用する場合、型定義は以下の通りです：

```typescript
interface AppletConfig {
  grid_column: number;  // 正の整数
  grid_row: number;     // 正の整数
  width: number;        // 正の数
  height: number;      // 正の数
  cell_size: number;   // 正の数
}
```

## コードベースの特徴

### 型安全性

- Zodを使用したランタイムバリデーション
- TypeScriptによる型チェック
- カスタムエラークラスによるエラーハンドリング

### パスエイリアス

`@/`エイリアスを使用して`src/`ディレクトリからの絶対パスでインポートできます：

```typescript
import { AppletFrames } from '@/AppletFrames'
import { loadApplets } from '@/lib/applets'
```

### 定数管理

すべての定数は`lib/constants.ts`に集約されています。

### エラーハンドリング

統一されたエラーハンドリングシステム：

- `AppletError`クラス: カスタムエラークラス
- `logError()` / `logWarning()`: 統一されたログ出力関数
