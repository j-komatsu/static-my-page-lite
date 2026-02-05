# アーキテクチャドキュメント

このドキュメントでは、Static My Pageの技術的な設計と実装の詳細を説明します。

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [ファイル構成](#ファイル構成)
3. [データモデル](#データモデル)
4. [主要コンポーネント](#主要コンポーネント)
5. [設計原則](#設計原則)
6. [技術選定の理由](#技術選定の理由)
7. [パフォーマンス最適化](#パフォーマンス最適化)

---

## プロジェクト概要

### アーキテクチャパターン

**クライアントサイド単一ページアプリケーション（SPA）**

- フロントエンドのみで完結
- バックエンドサーバー不要
- LocalStorageによるデータ永続化

### 技術スタック

| レイヤー | 技術 | 理由 |
|---------|------|------|
| **HTML** | HTML5 | セマンティックなマークアップ |
| **CSS** | バニラCSS | フレームワーク不要、軽量 |
| **JavaScript** | ES6+ | モダンな構文、バニラJS |
| **データ永続化** | LocalStorage API | ブラウザ標準、サーバー不要 |
| **デプロイ** | GitHub Pages | 静的ホスティング、無料 |

---

## ファイル構成

```
static-my-page/
├── index.html                 # メインHTMLファイル（エントリーポイント）
├── css/
│   └── style.css             # メインスタイルシート（全ページ共通）
├── js/
│   ├── script.js             # メインロジック（7000+ 行）
│   └── storage-manager.js    # LocalStorage管理
├── pages/                    # サブページ（将来的な拡張用）
├── docs/                     # ドキュメント
│   ├── FEATURES.md
│   ├── SETUP.md
│   ├── TROUBLESHOOTING.md
│   ├── ARCHITECTURE.md       # このファイル
│   ├── CONTRIBUTING.md
│   └── CHANGELOG.md
├── .claude/                  # Claude Code設定
│   └── project_instructions.md
├── .gitignore
└── README.md
```

### 主要ファイルの役割

#### index.html
- アプリケーションのエントリーポイント
- すべてのUI要素を含む
- モーダルダイアログの定義
- スクリプトとCSSの読み込み

#### css/style.css
- グローバルスタイル
- コンポーネント別スタイル定義
- レスポンシブデザイン
- カラーテーマ定義

#### js/script.js
- アプリケーションのコアロジック
- イベントハンドラ
- DOM操作
- LocalStorageとの連携

**主な機能モジュール:**
- リンク管理
- プロジェクト管理
- TODOリスト
- メモ管理
- カレンダー
- ポモドーロタイマー
- ナビゲーション設定
- データインポート/エクスポート

#### js/storage-manager.js
- LocalStorageの抽象化レイヤー
- データの読み書き処理
- エラーハンドリング

---

## データモデル

### LocalStorageのキー構造

```javascript
// メインページデータ
mainData: {
  sections: {
    'mypage-section1': {
      name: 'セクション1',
      links: [
        { text: 'リンク名', url: 'https://...', inline: false }
      ]
    },
    // ... section2-6
  },
  headerLinks: [
    { text: 'ヘッダーリンク', url: 'https://...' }
  ]
}

// プロジェクトページデータ（各プロジェクトごと）
projectData_<projectName>: {
  sections: { ... },
  todos: [
    { id: 'uuid', text: 'タスク内容', completed: false }
  ],
  memos: [
    { id: 'uuid', title: 'タイトル', content: '内容', category: '...' }
  ],
  calendar: {
    '2026-02-01': [
      { time: '10:00', event: 'イベント名' }
    ]
  }
}

// ポモドーロタイマー設定（グローバル）
pomodoroSettings_global: {
  workTime: 25,
  breakTime: 5,
  autoContinue: false,
  timerVisible: true,
  soundEnabled: true,
  warningSoundEnabled: false,
  notificationEnabled: true
}

// ポモドーロタイマー状態（グローバル）
pomodoroState_global: {
  isRunning: false,
  currentMode: 'work',  // 'work' | 'break'
  timeRemaining: 1500,  // 秒単位
  sessionCount: 0,
  lastSaveTime: 1234567890
}

// ナビゲーション設定
navigationButtonSettings: [
  { id: 'mypage', label: 'MyPage', visible: true },
  { id: 'todo', label: 'TODOリスト', visible: true },
  // ...
]

// ナビゲーションボタン順序
navigationButtonOrder: ['mypage', 'todo', 'memo', ...]
```

### データフロー

```
ユーザー入力
    ↓
イベントハンドラ（script.js）
    ↓
データ更新処理
    ↓
LocalStorage保存（storage-manager.js）
    ↓
UI更新（DOM操作）
```

---

## 主要コンポーネント

### 1. リンク管理システム

**責任:**
- リンクの追加・編集・削除
- セクション名の変更
- ドラッグ＆ドロップでの並び替え

**主要関数:**
```javascript
function editLinks(sectionId)          // リンク編集モーダルを開く
function addLink()                     // 新しいリンクを追加
function deleteLink(sectionId, index)  // リンクを削除
function saveSectionName(sectionId)    // セクション名を保存
function renderLinks(sectionId)        // リンク一覧を再描画
```

**イベント:**
- `onclick`: リンククリック、編集ボタン
- `ondragstart`, `ondrop`: ドラッグ＆ドロップ
- `onblur`: セクション名の保存

---

### 2. プロジェクト管理システム

**責任:**
- プロジェクトページの作成・削除
- ページ間の切り替え
- ページごとのデータ分離

**主要関数:**
```javascript
function addNewProject()               // 新しいプロジェクトを追加
function showDeleteProjectDialog()     // プロジェクト削除ダイアログ
function switchView(viewId)            // ビューを切り替え
function renderProjectTabs()           // プロジェクトタブを描画
```

**データ分離:**
- 各プロジェクトは独立したLocalStorageキーを持つ
- プロジェクト名がキーの一部となる（`projectData_<name>`）

---

### 3. ポモドーロタイマー

**責任:**
- タイマーのカウントダウン
- 作業/休憩モードの切り替え
- 通知の表示（サウンド・ブラウザ通知）
- セッション数のカウント

**主要関数:**
```javascript
function initializePomodoroTimer()     // タイマー初期化
function togglePomodoroTimer()         // 開始/一時停止切り替え
function resetPomodoroTimer()          // タイマーリセット
function handlePomodoroTimerComplete() // タイマー完了時の処理
function updatePomodoroDisplay()       // タイマー表示更新
function updatePomodoroTimerColor()    // タイマーの色を更新（平常/警告/休憩）
```

**サウンド生成:**
```javascript
// Web Audio APIを使用
function playWorkCompleteSound()       // 作業完了音（C6→E6→G6）
function playWarningSound()            // 警告音（A5×2回）
function playBreakCompleteSound()      // 休憩完了音（G6→E6）
```

**通知:**
```javascript
function showPomodoroNotification(completedMode)  // ブラウザ通知表示
function createPomodoroNotification(completedMode) // 通知オブジェクト作成
function showPomodoroWarningNotification()        // 20%警告通知
```

**状態管理:**
- `pomodoroState`: 現在のタイマー状態（実行中、残り時間など）
- `pomodoroSettings`: ユーザー設定（作業時間、休憩時間など）
- LocalStorageに1秒ごとに保存（ページリロード時に復元）

**タイマーの色管理:**
- 平常時: グレー（`.pomodoro-timer.normal`）
- 残り20%以下: 黄色（`.pomodoro-timer.warning`）
- 休憩時: 緑色（`.pomodoro-timer.break`）

---

### 4. ナビゲーション設定システム

**責任:**
- ナビゲーションボタンの表示/非表示管理
- ボタンの並び順管理
- ドラッグ＆ドロップでの並び替え

**主要関数:**
```javascript
function openNavigationSettings()         // 設定画面を開く
function saveNavigationSettings()         // 設定を保存
function resetNavigationSettings()        // デフォルトに戻す
function renderNavigationSettingsList()   // 設定リストを描画
function updateNavigationButtons()        // ナビゲーションボタンを更新
```

**デフォルトボタン:**
```javascript
const defaultNavigationButtons = [
  { id: 'mypage', label: 'MyPage', visible: true },
  { id: 'todo', label: 'TODOリスト', visible: true },
  { id: 'memo', label: 'メモ', visible: true },
  { id: 'calendar', label: 'カレンダー', visible: true },
  { id: 'pomodoro-settings', label: 'ポモドーロタイマー設定', visible: true }
];
```

---

### 5. データインポート/エクスポートシステム

**責任:**
- すべてのデータをJSONとしてエクスポート
- JSONからデータをインポート
- データの検証

**主要関数:**
```javascript
function exportData()                  // データをJSONでダウンロード
function importData(event)             // JSONからデータをインポート
function getAllData()                  // すべてのLocalStorageデータを取得
function validateImportData(data)      // インポートデータの検証
```

**エクスポート形式:**
```json
{
  "version": "1.0",
  "timestamp": "2026-02-01T12:00:00.000Z",
  "data": {
    "mainData": { ... },
    "projects": [ ... ],
    "settings": { ... }
  }
}
```

---

## 設計原則

### 1. シンプルさを保つ

- **フレームワーク不使用**: 依存関係を最小化
- **バニラJavaScript**: 学習コストの低減
- **単一HTMLファイル**: デプロイが容易

### 2. データの永続性

- **LocalStorageの活用**: サーバー不要
- **1秒ごとの自動保存**: データロスを防ぐ（ポモドーロタイマー）
- **エクスポート機能**: バックアップを容易に

### 3. ユーザビリティ

- **即座のフィードバック**: UIの変更が即座に反映
- **直感的な操作**: ドラッグ＆ドロップ、クリックでの編集
- **視覚的なフィードバック**: ホバー効果、アニメーション

### 4. モジュール性

- **機能ごとの関数分離**: 保守性の向上
- **グローバル変数の最小化**: 名前空間汚染を防ぐ
- **設定の分離**: ユーザー設定と状態を分離

### 5. アクセシビリティ

- **キーボード操作対応**: Enter、Escキーでの操作
- **セマンティックHTML**: 適切なタグの使用
- **ARIA属性**: （今後の改善点）

---

## 技術選定の理由

### なぜバニラJavaScriptか？

**利点:**
- 依存関係がない（セキュリティリスク低減）
- ビルドプロセス不要
- 学習コストが低い
- パフォーマンスが良い
- 長期的なメンテナンスが容易

**トレードオフ:**
- 状態管理が手動
- コード量が多くなる
- 型安全性がない（TypeScriptと比較）

### なぜLocalStorageか？

**利点:**
- サーバー不要（コスト削減）
- オフラインで動作
- 実装が簡単
- 高速なデータアクセス

**制限事項:**
- ストレージ容量制限（通常5〜10MB）
- 同一ドメイン内のみ
- デバイス間同期なし

### なぜGitHub Pagesか？

**利点:**
- 無料
- 簡単なデプロイ（git pushのみ）
- HTTPS対応
- CDN配信

---

## パフォーマンス最適化

### 1. DOM操作の最小化

**悪い例:**
```javascript
for (let i = 0; i < 100; i++) {
  element.innerHTML += '<div>' + i + '</div>';  // 毎回再描画
}
```

**良い例:**
```javascript
let html = '';
for (let i = 0; i < 100; i++) {
  html += '<div>' + i + '</div>';
}
element.innerHTML = html;  // 1回だけ描画
```

### 2. LocalStorageへのアクセス最小化

**キャッシュの活用:**
```javascript
let cachedData = null;

function getData() {
  if (!cachedData) {
    cachedData = JSON.parse(localStorage.getItem('key'));
  }
  return cachedData;
}
```

### 3. イベントリスナーの適切な管理

**イベントデリゲーション:**
```javascript
// 悪い例: 各要素にイベントリスナー
links.forEach(link => {
  link.addEventListener('click', handleClick);
});

// 良い例: 親要素で一括管理
container.addEventListener('click', (e) => {
  if (e.target.matches('.link')) {
    handleClick(e);
  }
});
```

### 4. CSS Animationsの使用

JavaScriptアニメーションよりCSS Animationsを優先:
```css
.pomodoro-timer-container {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 今後の改善点

### 短期
- TypeScriptへの移行検討
- ユニットテストの追加
- ARIA属性の追加

### 中期
- Service Workerによるオフライン対応強化
- PWA化（インストール可能なアプリ）
- クラウド同期機能（オプション）

### 長期
- モバイルアプリ版
- ブラウザ拡張機能
- チーム共有機能

---

最終更新: 2026年2月
