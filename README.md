# Next.js 14 Feature-Based プロジェクト

## 📚 目次

- [ディレクトリ構成](#ディレクトリ構成)
- [開発ガイドライン](#開発ガイドライン)

## ディレクトリ構成

```
project-root/
├── .storybook/               # Storybook設定
├── public/                   # 静的ファイル
├── src/
│   ├── app/                  # App Router用のページ
│   ├── components/           # 共通コンポーネント
│   │   ├── ui/               # 基本UIコンポーネント
│   │   └── layout/           # レイアウトコンポーネント
│   ├── features/             # 機能別モジュール
│   │   ├── auth/             # 認証機能の例
│   │   │   ├── components/   # 認証関連コンポーネント
│   │   │   ├── hooks/        # 認証関連フック
│   │   │   ├── store/        # 認証状態管理
│   │   │   └── utils/        # 認証関連ユーティリティ
│   │   └── ...               # 他の機能
│   ├── hooks/                # グローバルフック
│   ├── lib/                  # ユーティリティと外部ライブラリラッパー
│   ├── utils/                # 汎用ユーティリティ関数
│   ├── styles/               # グローバルスタイル
│   └── types/                # グローバル型定義
├── .eslintrc.js              # ESLint設定
├── .gitignore
├── jest.config.js            # Jest設定
├── next.config.js            # Next.js設定
├── package.json
└── tsconfig.json             # TypeScript設定
```

## 開発ガイドライン

### 新機能の追加

1. `src/features/`に新しいディレクトリを作成します。
2. 機能に必要なコンポーネント、フック、ユーティリティを適切なサブディレクトリに配置します。
3. 状態管理が必要な場合は、`store/`ディレクトリに Zustand ストアを作成します。

### コンポーネント開発

- 共通コンポーネントは`src/components/`に配置します。
- 機能特有のコンポーネントは、対応する`features/`ディレクトリ内に配置します。
- 各コンポーネントには Storybook のストーリーと Jest のテストを作成します。

### 状態管理

- グローバルな状態には Zustand を使用します。
- API リクエストとサーバー状態の管理には React Query を使用します。

### フォーム処理

- フォームの構築には React Hook Form を使用します。
- バリデーションスキーマには Zod を使用し、React Hook Form と統合します。

## テストと Storybook

### テスト

- Jest と react-testing-library を使用してユニットテストとインテグレーションテストを作成します。
- テストファイルは対応するコンポーネントや機能と同じディレクトリに配置し、`.test.ts(x)`または`.spec.ts(x)`の拡張子を使用します。
- テストの実行:
  ```bash
  npm test
  ```

### Storybook

- 各 UI コンポーネントの Storybook ストーリーを作成します。
- Storybook の起動:
  ```bash
  npm run storybook
  ```
