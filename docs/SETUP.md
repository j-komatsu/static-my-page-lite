# セットアップガイド

このドキュメントでは、Static My Pageのセットアップ方法を説明します。

## 目次

1. [前提条件](#前提条件)
2. [オンラインで使用する](#オンラインで使用する)
3. [ローカル環境でのセットアップ](#ローカル環境でのセットアップ)
4. [GitHub Pagesでの公開](#github-pagesでの公開)
5. [カスタマイズ](#カスタマイズ)
6. [ブラウザ設定](#ブラウザ設定)

---

## 前提条件

### 必須
- **モダンなWebブラウザ**
  - Google Chrome 90以降
  - Mozilla Firefox 88以降
  - Microsoft Edge 90以降
  - Safari 14以降

### 推奨
- **LocalStorageが有効**であること
- **JavaScriptが有効**であること
- **通知機能を使用する場合**: ブラウザの通知許可

### ローカル開発の場合
- Gitクライアント（任意）
- ローカルサーバー（任意、推奨）
  - Python 3.x
  - Node.js（http-server）
  - その他のWebサーバー

---

## オンラインで使用する

最も簡単な方法は、デモサイトを直接使用することです。

### 手順

1. ブラウザで以下のURLにアクセス：
   ```
   https://j-komatsu.github.io/static-my-page/#main
   ```

2. すぐに使い始められます！

### 注意事項

- データはブラウザのLocalStorageに保存されます
- デバイスやブラウザが変わると、データにアクセスできません
- **定期的にデータをエクスポート**してバックアップすることを推奨

---

## ローカル環境でのセットアップ

自分のコンピュータで動かしたい場合の手順です。

### 方法1: HTMLファイルを直接開く（最も簡単）

#### 手順

1. **リポジトリをダウンロード**

   **Git経由:**
   ```bash
   git clone https://github.com/j-komatsu/static-my-page.git
   cd static-my-page
   ```

   **ZIP経由:**
   - [GitHubリポジトリ](https://github.com/j-komatsu/static-my-page)にアクセス
   - 「Code」→「Download ZIP」をクリック
   - ZIPファイルを展開

2. **index.htmlをブラウザで開く**

   - エクスプローラー（Windows）またはFinder（Mac）で `index.html` を見つける
   - ダブルクリックでブラウザで開く

#### 制限事項

- 一部のブラウザでは、ファイルプロトコル（`file://`）での動作に制限がある場合があります
- その場合は、方法2を使用してください

---

### 方法2: ローカルサーバーを使用（推奨）

ローカルサーバーを使用すると、より本番環境に近い状態で動作確認できます。

#### Python 3を使用

```bash
# リポジトリをクローン
git clone https://github.com/j-komatsu/static-my-page.git
cd static-my-page

# Python 3でサーバーを起動
python -m http.server 8000

# または、Python 2の場合
python -m SimpleHTTPServer 8000
```

ブラウザで http://localhost:8000 にアクセス

#### Node.jsのhttp-serverを使用

```bash
# リポジトリをクローン
git clone https://github.com/j-komatsu/static-my-page.git
cd static-my-page

# http-serverをインストール（初回のみ）
npm install -g http-server

# サーバーを起動
http-server
```

ブラウザで http://localhost:8080 にアクセス

#### VS Codeの Live Server を使用

1. VS Codeで `static-my-page` フォルダを開く
2. 拡張機能「Live Server」をインストール
3. `index.html` を右クリック → 「Open with Live Server」

---

## GitHub Pagesでの公開

自分専用のURLで公開したい場合の手順です。

### 手順

1. **GitHubアカウントを作成**
   - まだない場合は、[GitHub](https://github.com) でアカウント作成

2. **リポジトリをフォーク**
   - [元のリポジトリ](https://github.com/j-komatsu/static-my-page)にアクセス
   - 右上の「Fork」ボタンをクリック

3. **GitHub Pagesを有効化**
   - フォークしたリポジトリの「Settings」タブを開く
   - 左メニューから「Pages」を選択
   - 「Source」で「main」ブランチを選択
   - 「Save」をクリック

4. **公開URLを確認**
   - 数分後、ページが公開されます
   - URL: `https://<あなたのユーザー名>.github.io/static-my-page/`

### カスタムドメインの設定（オプション）

独自ドメインを持っている場合は、GitHub Pagesでカスタムドメインを設定できます。

詳細: [GitHub Pagesのドキュメント](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## カスタマイズ

### タイトルの変更

#### 方法1: アプリ内で変更
1. ページ上部のタイトル（「My Page」）をクリック
2. 新しいタイトルを入力
3. Enterキーで保存

#### 方法2: HTMLを直接編集
`index.html` の以下の行を編集：

```html
<h1 id="main-title" onclick="editMainTitle()">My Page</h1>
```

`My Page` を任意のタイトルに変更してください。

### デフォルト設定の変更

#### ポモドーロタイマーのデフォルト時間

`js/script.js` の以下の部分を編集：

```javascript
const defaultPomodoroSettings = {
  workTime: 25,        // 作業時間（分）
  breakTime: 5,        // 休憩時間（分）
  autoContinue: false, // 自動継続
  timerVisible: true,  // タイマー表示
  soundEnabled: true,  // サウンド通知
  warningSoundEnabled: false, // 警告音
  notificationEnabled: true   // ブラウザ通知
};
```

#### ナビゲーションボタンのデフォルト

`js/script.js` の `defaultNavigationButtons` を編集してください。

### スタイルのカスタマイズ

`css/style.css` を編集することで、見た目を変更できます。

#### 配色の変更例

```css
/* ポモドーロタイマーの平常時の色 */
.pomodoro-timer.normal {
  border-color: #6c757d; /* お好みの色に変更 */
}

/* 警告色 */
.pomodoro-timer.warning {
  border-color: #e0a800;
  background: linear-gradient(135deg, #fffbf0 0%, #fff8e1 100%);
}

/* 休憩時間の色 */
.pomodoro-timer.break {
  border-color: #5a9f8c;
  background: linear-gradient(135deg, #f0faf7 0%, #e8f5f1 100%);
}
```

---

## ブラウザ設定

### LocalStorageの確認

LocalStorageが有効かどうかを確認する方法：

#### Chrome / Edge
1. 開発者ツールを開く（F12キー）
2. 「Application」タブを選択
3. 左メニューの「Local Storage」を展開
4. サイトのURLをクリック
5. データが表示されればOK

#### Firefox
1. 開発者ツールを開く（F12キー）
2. 「ストレージ」タブを選択
3. 「ローカルストレージ」を展開
4. サイトのURLをクリック

### 通知の許可

ポモドーロタイマーのブラウザ通知を使用する場合：

#### Chrome / Edge
1. アドレスバーの左側の鍵アイコンをクリック
2. 「このサイトの設定」をクリック
3. 「通知」を「許可」に設定

#### Firefox
1. アドレスバーの左側のアイコンをクリック
2. 「接続の詳細を表示」
3. 「その他の情報」→「サイト別設定」
4. 「通知」を「許可」に設定

### プライベートブラウジングモードについて

**注意:** プライベートブラウジングモード（シークレットモード）では、LocalStorageのデータはセッション終了時に削除されます。

継続的に使用する場合は、通常モードで使用してください。

---

## トラブルシューティング

問題が発生した場合は、[TROUBLESHOOTING.md](TROUBLESHOOTING.md) を参照してください。

---

## 次のステップ

セットアップが完了したら、以下のドキュメントを参照してください：

- [機能詳細ガイド](FEATURES.md) - 各機能の使い方
- [アーキテクチャ](ARCHITECTURE.md) - 技術的な詳細（開発者向け）
- [コントリビューションガイド](CONTRIBUTING.md) - 開発に参加したい場合

---

最終更新: 2026年2月
