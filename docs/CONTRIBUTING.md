# コントリビューションガイド

Static My Pageプロジェクトへの貢献を歓迎します！このドキュメントでは、プロジェクトへの参加方法を説明します。

## 目次

1. [行動規範](#行動規範)
2. [開発方針](#開発方針)
3. [開発環境のセットアップ](#開発環境のセットアップ)
4. [開発ワークフロー](#開発ワークフロー)
5. [コーディング規約](#コーディング規約)
6. [プルリクエストのガイドライン](#プルリクエストのガイドライン)
7. [バグ報告](#バグ報告)
8. [機能要望](#機能要望)

---

## 行動規範

### 基本原則

- 互いに尊重し、建設的なコミュニケーションを心がける
- 多様な意見や経験を尊重する
- 技術的な議論に集中し、個人攻撃は避ける
- 初心者やコントリビューターを歓迎し、サポートする

### 禁止事項

- ハラスメントや差別的な言動
- 他者の個人情報の公開
- スパムや宣伝目的の投稿
- プロジェクトと無関係な議論

---

## 開発方針

このプロジェクトは以下の方針に従っています：

### 1. シンプルさを保つ

- **フレームワークに依存しない**
  - バニラJavaScript、バニラCSSを使用
  - 外部ライブラリの追加は最小限に

- **過度な抽象化を避ける**
  - 必要になるまで複雑な設計を導入しない
  - YAGNI原則（You Aren't Gonna Need It）を守る

### 2. ユーザーが明示的に要求した機能のみを実装

- 「あると便利かもしれない」機能は追加しない
- Issueやディスカッションで要望があった機能を優先
- 既存機能の改善を優先

### 3. 既存のコードスタイルとトーンを維持

- コードの一貫性を保つ
- 既存のパターンに従う
- 大規模なリファクタリングは慎重に

---

## 開発環境のセットアップ

### 前提条件

- Git
- モダンなWebブラウザ（Chrome, Firefox, Edge）
- テキストエディタ（VS Code推奨）

### セットアップ手順

1. **リポジトリをフォーク**
   ```
   GitHubでリポジトリページの右上「Fork」ボタンをクリック
   ```

2. **ローカルにクローン**
   ```bash
   git clone https://github.com/<あなたのユーザー名>/static-my-page.git
   cd static-my-page
   ```

3. **上流リポジトリを追加**
   ```bash
   git remote add upstream https://github.com/j-komatsu/static-my-page.git
   ```

4. **ローカルサーバーを起動**
   ```bash
   # Python 3の場合
   python -m http.server 8000

   # VS Codeの場合
   # Live Server拡張機能をインストールして使用
   ```

5. **ブラウザで確認**
   ```
   http://localhost:8000
   ```

### 推奨ツール

#### VS Code拡張機能
- **Live Server** - ライブリロード機能
- **Prettier** - コードフォーマッター
- **ESLint** - JavaScriptリンター（導入検討中）

---

## 開発ワークフロー

### 1. Issue を確認

- 作業を開始する前に、既存のIssueを確認
- 同じ問題や機能が報告されていないか確認
- 新しい機能を追加する場合は、まずIssueを作成して議論

### 2. ブランチを作成

```bash
# 最新の状態に更新
git checkout main
git pull upstream main

# 新しいブランチを作成
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

**ブランチ命名規則:**
- `feature/` - 新機能
- `fix/` - バグ修正
- `docs/` - ドキュメント更新
- `refactor/` - リファクタリング
- `style/` - スタイル変更（コード動作に影響しない）

### 3. 変更を加える

- 小さな変更を積み重ねる
- 1つのコミットで1つの論理的な変更
- 頻繁にコミット

### 4. コミット

```bash
git add .
git commit -m "feat: ポモドーロタイマーに長押しリセット機能を追加"
```

**コミットメッセージの規則:**
```
<type>: <subject>

<body>（オプション）

<footer>（オプション）
```

**Type:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイルの変更（動作に影響なし）
- `refactor`: リファクタリング
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

**例:**
```
feat: ポモドーロタイマーに長押しリセット機能を追加

リセットボタンを長押しすると、セッション数もリセットされるようにしました。

Closes #123
```

### 5. プッシュ

```bash
git push origin feature/your-feature-name
```

### 6. プルリクエストを作成

GitHubで自分のフォークからプルリクエストを作成

---

## コーディング規約

### JavaScript

#### 命名規則

```javascript
// 関数: キャメルケース
function getUserData() { }
function calculateTotal() { }

// 変数: キャメルケース
let currentUser = {};
const maxRetries = 3;

// 定数: アッパーケース（グローバル定数のみ）
const API_BASE_URL = 'https://...';
const MAX_FILE_SIZE = 1024 * 1024;

// プライベート関数: アンダースコアプレフィックス（慣習）
function _internalHelper() { }
```

#### コードスタイル

```javascript
// インデント: 2スペース
function example() {
  if (condition) {
    doSomething();
  }
}

// 文字列: シングルクォート優先
const message = 'Hello, World!';
const html = '<div class="container"></div>';

// セミコロン: 使用する
const x = 5;
const y = 10;

// 比較: === を使用
if (value === 'test') { }

// アロー関数: 適切に使用
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
```

#### コメント

```javascript
// 良いコメント: なぜその実装なのかを説明
// Web Audio APIはユーザー操作後にのみ動作するため、ここで初期化
if (audioContext.state === 'suspended') {
  audioContext.resume();
}

// 悪いコメント: 何をしているか（コードを見ればわかる）
// x に 1 を足す
x = x + 1;

// 関数の説明（必要に応じて）
/**
 * ポモドーロタイマーを初期化する
 * LocalStorageから状態を復元し、UIを更新する
 */
function initializePomodoroTimer() {
  // ...
}
```

#### グローバル変数の最小化

```javascript
// 悪い例: グローバル変数だらけ
let user;
let settings;
let timer;

// 良い例: 必要最小限
const pomodoroState = {
  isRunning: false,
  currentMode: 'work',
  timeRemaining: 1500
};
```

---

### CSS

#### 命名規則（BEMに準拠）

```css
/* Block */
.pomodoro-timer { }

/* Element */
.pomodoro-timer__display { }
.pomodoro-timer__button { }

/* Modifier */
.pomodoro-timer--warning { }
.pomodoro-timer__button--disabled { }
```

#### コードスタイル

```css
/* インデント: 2スペース */
.example {
  display: flex;
  flex-direction: column;
}

/* プロパティの順序（推奨）*/
.example {
  /* 位置 */
  position: absolute;
  top: 0;
  left: 0;

  /* ボックスモデル */
  display: flex;
  width: 100%;
  padding: 10px;
  margin: 10px;

  /* 視覚 */
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;

  /* テキスト */
  font-size: 14px;
  line-height: 1.5;

  /* その他 */
  transition: all 0.3s;
}

/* 色: 小文字の16進数またはrgba */
.example {
  color: #333;
  background-color: rgba(0, 0, 0, 0.5);
}
```

---

### HTML

```html
<!-- インデント: 2スペース -->
<div class="container">
  <h1>Title</h1>
  <p>Content</p>
</div>

<!-- セマンティックなタグを使用 -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>

<!-- ダブルクォート使用 -->
<div class="example" id="test"></div>

<!-- 自己終了タグにスラッシュ不要（HTML5） -->
<input type="text">
<br>
<img src="...">
```

---

## プルリクエストのガイドライン

### プルリクエストの作成

1. **明確なタイトル**
   ```
   feat: ポモドーロタイマーに一時停止機能を追加
   fix: リンク削除時のバグを修正
   docs: READMEにセットアップ手順を追加
   ```

2. **詳細な説明**
   ```markdown
   ## 変更内容
   - ポモドーロタイマーに一時停止ボタンを追加
   - 一時停止中は残り時間が保持される
   - LocalStorageに状態を保存

   ## テスト方法
   1. タイマーを開始
   2. 一時停止ボタンをクリック
   3. ページをリロード
   4. 残り時間が保持されていることを確認

   ## スクリーンショット
   ![一時停止ボタン](...)

   ## 関連Issue
   Closes #123
   ```

3. **チェックリスト**
   - [ ] 既存の機能が壊れていないことを確認
   - [ ] コーディング規約に従っている
   - [ ] コメントを適切に追加した
   - [ ] ドキュメントを更新した（必要に応じて）
   - [ ] 複数のブラウザでテストした

### レビュープロセス

1. **自己レビュー**
   - プルリクエストを作成する前に、自分で変更をレビュー
   - 不要なコメントやデバッグコードを削除

2. **レビュー待ち**
   - メンテナーがレビューを行います
   - フィードバックがあれば対応してください

3. **マージ**
   - 承認後、メンテナーがマージします

---

## バグ報告

### バグを見つけたら

1. **既存のIssueを検索**
   - 同じバグが報告されていないか確認

2. **Issueを作成**
   - [New Issue](https://github.com/j-komatsu/static-my-page/issues/new)から作成

### バグレポートのテンプレート

```markdown
## バグの説明
ポモドーロタイマーをリセットすると、セッション数も0になってしまう

## 再現手順
1. タイマーを開始
2. いくつかセッションを完了
3. リセットボタンをクリック
4. セッション数が0になる

## 期待される動作
リセットボタンは残り時間のみをリセットし、セッション数は保持されるべき

## 実際の動作
セッション数も0にリセットされる

## 環境情報
- OS: Windows 10
- ブラウザ: Chrome 120.0.6099.129
- バージョン: 最新のmainブランチ

## スクリーンショット
（可能であれば添付）

## 開発者ツールのエラーメッセージ
（Consoleにエラーがあれば貼り付け）
```

---

## 機能要望

### 新しい機能を提案したい場合

1. **Discussionsで議論**
   - まずはDiscussionsで提案を共有
   - コミュニティのフィードバックを得る

2. **Issueを作成**
   - 十分な議論があれば、Issueとして正式に提案

### 機能要望のテンプレート

```markdown
## 機能の説明
ポモドーロタイマーに長休憩（Long Break）機能を追加したい

## 動機
4セッション完了後は、5分ではなく15分の長休憩が推奨されている

## 提案する実装
- 設定に「4セッション後に長休憩」オプションを追加
- 長休憩時間を設定可能に（デフォルト15分）
- 4セッションごとに自動的に長休憩モードに切り替わる

## 代替案
- なし

## 追加コンテキスト
ポモドーロテクニックの標準的な手法に準拠
```

---

## 質問やサポート

### どこで質問すればいい？

- **GitHub Discussions**: 一般的な質問や議論
- **Issues**: バグ報告や機能要望
- **Pull Requests**: コードに関する具体的な質問

### 良い質問の仕方

1. **具体的に**
   - 「動かない」ではなく、「〇〇したら××というエラーが出る」

2. **環境情報を含める**
   - OS、ブラウザ、バージョン

3. **試したことを記載**
   - 「〇〇を試したが解決しなかった」

---

## ライセンス

このプロジェクトに貢献することで、あなたのコントリビューションがMITライセンスの下で公開されることに同意したものとみなされます。

---

## 謝辞

コントリビューターの皆様に感謝します！

---

最終更新: 2026年2月
