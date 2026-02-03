# Static My Page Lite

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

**シンプルで軽量なブックマーク管理ツール**

Static My Page Liteは、[Static My Page](https://github.com/j-komatsu/static-my-page)の簡略版で、ブックマーク管理機能のみに特化したシングルページアプリケーションです。

## 特徴

- **シンプル**: ブックマーク管理機能のみ。複雑な機能は一切なし
- **軽量**: わずか約2700行のコード（元の70%削減）
- **高速**: フレームワーク不要、純粋なHTML/CSS/JavaScript
- **サーバー不要**: LocalStorageでデータを保存、完全にオフラインで動作
- **バックアップ**: JSON形式でエクスポート/インポート可能

## 機能一覧

### ブックマーク管理
- 6つのセクションでリンクを整理
- リンクの追加・編集・削除
- セクション名の変更
- ドラッグ&ドロップで並び替え
- 1行表示（コンパクトモード）

### ヘッダーリンク
- ヘッダーに常時表示されるリンク
- 素早くアクセスできる

### データ管理
- JSONファイルでエクスポート/インポート
- LocalStorageへの自動保存
- データのバックアップと復元

## セットアップ

### オンラインで使用

デモサイト: [https://j-komatsu.github.io/static-my-page-lite/](https://j-komatsu.github.io/static-my-page-lite/)

### ローカルで使用

#### 方法1: HTMLファイルを直接開く

```bash
git clone https://github.com/j-komatsu/static-my-page-lite.git
cd static-my-page-lite
# index.htmlをブラウザで開く
```

#### 方法2: ローカルサーバーを使用（推奨）

```bash
git clone https://github.com/j-komatsu/static-my-page-lite.git
cd static-my-page-lite

# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

ブラウザで http://localhost:8000 にアクセス

## 使い方

### 基本操作

1. **セクション名の変更**
   - セクション名をクリック → 編集 → Enterで保存

2. **リンクの追加**
   - 「✏️」ボタンをクリック → 「+ 新しいリンクを追加」

3. **リンクの編集**
   - リンク編集モーダルでテキストやURLを変更

4. **リンクの並び替え**
   - ☰マークをドラッグ&ドロップ

5. **1行表示モード**
   - 「1行表示」チェックボックスをON

### データのバックアップ

1. **エクスポート**
   - ヘッダーの「💾」ボタンをクリック
   - JSONファイルがダウンロードされます

2. **インポート**
   - ヘッダーの「📂」ボタンをクリック
   - エクスポートしたJSONファイルを選択

## ファイル構成

```
static-my-page-lite/
├── index.html              # メインHTMLファイル（約200行）
├── css/
│   └── style.css           # スタイルシート（約600行）
├── js/
│   ├── script.js           # メインロジック（約650行）
│   └── storage-manager.js  # LocalStorage管理（約185行）
└── README.md               # このファイル
```

## 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: バニラCSS、レスポンシブデザイン
- **JavaScript (ES6+)**: バニラJS、フレームワークなし
- **LocalStorage API**: データ永続化

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## Static My Page との違い

| 項目 | Static My Page | Static My Page Lite |
|------|----------------|---------------------|
| **機能数** | 8機能 | 1機能 |
| **コード行数** | 約9100行 | 約2700行 |
| **機能** | リンク、TODO、メモ、カレンダー、ポモドーロタイマー等 | ブックマークのみ |
| **学習時間** | 30分 | 5分 |
| **対象ユーザー** | パワーユーザー | シンプル志向 |

## よくある質問

### Q: データはどこに保存されますか？
A: ブラウザのLocalStorageに保存されます。デバイスやブラウザが異なると、データにアクセスできません。定期的にエクスポートしてバックアップすることを推奨します。

### Q: データが消えてしまいました
A: ブラウザのキャッシュをクリアすると、LocalStorageのデータも削除されます。エクスポートしたJSONファイルがあれば、インポート機能で復元できます。

### Q: セクション数を増やせますか？
A: 現在は6セクション固定です。将来的なアップデートで対応する可能性があります。

### Q: モバイルで使えますか？
A: はい、レスポンシブデザインに対応しています。

## トラブルシューティング

### データが保存されない
- LocalStorageが有効か確認してください
- プライベートブラウジングモード（シークレットモード）では、データはセッション終了時に削除されます

### インポートが失敗する
- JSONファイルが正しい形式か確認してください
- このアプリでエクスポートしたファイルのみがインポート可能です

## 開発

### ローカル開発環境

```bash
# リポジトリをクローン
git clone https://github.com/j-komatsu/static-my-page-lite.git
cd static-my-page-lite

# ローカルサーバーを起動
python -m http.server 8000

# ブラウザで開く
open http://localhost:8000
```

### カスタマイズ

- **タイトルの変更**: `index.html` の `<h1 id="main-title">` を編集
- **配色の変更**: `css/style.css` を編集
- **デフォルトセクション数**: `js/script.js` の `getDefaultData()` を編集

## コントリビューション

プルリクエストやイシューを歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください。

## リンク

- **フル版**: [Static My Page](https://github.com/j-komatsu/static-my-page)
- **デモサイト**: [https://j-komatsu.github.io/static-my-page-lite/](https://j-komatsu.github.io/static-my-page-lite/)
- **Issue報告**: [GitHub Issues](https://github.com/j-komatsu/static-my-page-lite/issues)

## 作者

[j-komatsu](https://github.com/j-komatsu)

## 謝辞

このプロジェクトは [Static My Page](https://github.com/j-komatsu/static-my-page) の派生版です。

---

最終更新: 2026年2月
