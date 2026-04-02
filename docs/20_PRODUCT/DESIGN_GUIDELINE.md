# DESIGN GUIDELINE / デザインガイドライン

## 0. Scope / 適用範囲
- JA: 本ガイドは `inim-dx` 公開サイトの UI デザイン基準です。`references/design/05-wireframe.html` と `references/design/06-design-guide.html` を正本とし、不足補完のみ `references/design/01-proposal.html` を参照しています。
- EN: This guideline defines UI design standards for the `inim-dx` public site. It is based on `05-wireframe.html` and `06-design-guide.html`, with limited gap-filling from `01-proposal.html`.

## 1. Design Intent / デザイン意図
- JA: 短期成果は「流入増」より「到達率 × CVR 改善」を優先し、トップからワークショップ予約までの導線を最短化する。
- EN: Prioritise short-term impact through improved reach rate and CVR, not traffic growth, by minimising friction from top page to workshop booking.
- JA: 体験価値（高評価のワークショップ）を、視覚とコピーで即時理解させる。
- EN: Make workshop value (already highly rated) instantly understandable through visuals and copy.
- JA: 魅力訴求に加え、不安解消（価格、所要時間、初心者歓迎、FAQ）を上部?中段で明示する。
- EN: Pair appeal with reassurance elements (price, duration, beginner-friendliness, FAQ) in upper-to-middle sections.

## 2. Layout Architecture / レイアウト構成

### 2.1 Global Structure / 全体構造
- JA: Desktop 基準幅は 1440px。左サイドナビ 200px、メインコンテンツ 1200px。
- EN: Desktop baseline is 1440px with a 200px left sidebar and 1200px main content.
- JA: 左ナビは常時表示（固定構造）を基本とする。
- EN: Left navigation is persistent as a fixed structural element.

### 2.2 Top Page Information Flow / トップページ情報設計
- JA: 推奨順序は「Header → Hero → 体験バナー（香游）→ 体験の流れ（3step）→ PICK UP → 体験バナー再掲 → 新着商品（3x2）→ Footer」。
- EN: Recommended order: Header → Hero → Experience banner → 3-step flow → PICK UP → repeated banner → New arrivals (3x2) → Footer.
- JA: UX 目的は `TOP → デジタル調香体験 → ワークショップ予約` の導線形成。
- EN: UX objective is a clear path: `Top → Digital blending experience → Workshop booking`.

### 2.3 Left Sidebar IA / 左サイドナビ IA
- JA: 基本カテゴリは `ブランド / アイテム / 香りから探す / 香りと遊ぶ！香游 / 記事 / Sale / 実店舗 / ショッピングガイド`。
- EN: Core categories: `Brand / Items / Search by scent / Play with scent / Articles / Sale / Shops / Shopping guide`.

## 3. Colour System / カラーシステム

### 3.1 Core Palette / 基本パレット
- JA/EN:
  - Main: `#2C2C2C` (header, buttons, headings)
  - Sub: `#EAE4D3` (background blocks, cards, section separators)
  - Accent: `#B24531` (CTA, links, emphasis)
  - Page Background: `#F9F8F4`
  - Text Primary: `#1A1A1A`
  - Text Secondary: `#666666`

### 3.2 Theme Palettes / テーマパレット
- JA: 公開サイトは `body[data-theme="p01"...]` の切替で 28 パレットを適用する（可読性重視で一部パレットを除外）。
- EN: The public site applies 28 palettes via `body[data-theme="p01"...]` after removing low-readability sets.
- JA: テーマ切替はヘッダーの `テーマ` ドロップダウンから行い、選択は `localStorage` キー `inim-theme` に保存する。
- EN: Theme selection is done via the header `Theme` dropdown and persisted in `localStorage` key `inim-theme`.
- JA: テーマ名はパレット名のみを表示し、`P01-40` の接頭表記は UI に出さない。
- EN: Theme labels show the palette name only; do not display the `P01-40` prefix in the UI.
- JA: テーマ名は色の印象を想像しやすい英語名（例: Floral Breeze）を基本とする。
- EN: Theme labels use approved descriptive English names for quick color imagination (for example, `Floral Breeze`).
- JA: 除外IDは `p02, p03, p11, p20, p21, p22, p24, p27, p28, p36, p38, p39`。
- EN: Removed IDs are `p02, p03, p11, p20, p21, p22, p24, p27, p28, p36, p38, p39`.
- JA: ヘッダーではテーマを常時全件表示し、分類ドロップダウンは使用しない。
- EN: The header always shows all active theme options; no group dropdown is used.
- JA: 色の参照は CSS 変数（`--color-bg`, `--color-main`, `--color-accent`, `--color-line-strong` など）で統一し、直接色指定は避ける。
- EN: Use CSS variables (`--color-bg`, `--color-main`, `--color-accent`, `--color-line-strong`, etc.) for color usage; avoid direct hex values.
### 3.3 Alert/Status Colours / アラート色
- JA/EN:
  - Info: left border `#2C2C2C`, bg `#F3F3F3`
  - Success: left border `#2F7A4A`, bg `#EDF7F0`
  - Warning: left border `#9A6A17`, bg `#FFF8E8`
  - Error: left border `#B24531`, bg `#FFF1EE`

## 4. Typography / タイポグラフィ
- JA/EN: Primary font family is `Noto Sans JP`.
- JA/EN:
  - `h1`: 40px / 700 / line-height 1.3 / letter-spacing 0.04em
  - `h2`: 30px / 700 / line-height 1.35 / letter-spacing 0.03em
  - `h3`: 24px / 600 / line-height 1.4 / letter-spacing 0.02em
  - Body: 16px / 400 / line-height 1.8 / letter-spacing 0.01em
  - Caption: 13px / 400 / line-height 1.6 / letter-spacing 0.03em
  - Button text: 16px / 500 / line-height 1.4 / letter-spacing 0.02em
- JA: ヘッダー補助要素（テーマ選択、アカウントリンク）は同一サイズ/ウェイトで統一する。
- EN: Header utility elements (theme selector, account links) share the same font size/weight.

## 5. Components / コンポーネント規則

### 5.1 Buttons / ボタン
- JA: 最小高さ 44px、水平 padding 20px、角丸 10px。Primary / Secondary / Danger を使い分ける。
- EN: Minimum height 44px, horizontal padding 20px, radius 10px. Use Primary / Secondary / Danger variants.
- JA: Primary は Main/Accent 系、Secondary は薄背景 + 境界線、Danger は破壊的操作専用。
- EN: Primary uses Main/Accent tones, Secondary uses light surface with border, Danger is for destructive actions only.

### 5.2 Inputs / 入力要素
- JA: 入力欄は角丸 10px、境界線は中立色。Focus は Main 系リング、Error は Accent 系リングで可視化。
- EN: Inputs use 10px radius with neutral borders. Focus uses Main-tone ring; errors use Accent-tone ring.

### 5.3 Cards / カード
- JA: カードは背景コントラストと余白で情報群を分離し、角丸 12px を基準に統一。
- EN: Cards separate information through contrast and spacing, standardised at 12px corner radius.

## 6. Spacing, Radius, Shadow / 余白・角丸・シャドウ

### 6.1 Content Width / コンテンツ最大幅
- JA/EN:
  - PC: max 1200px, horizontal padding 40px
  - Tablet: max 960px, horizontal padding 24px
  - Mobile: max 100%, horizontal padding 16px

### 6.2 Grid / グリッド
- JA/EN:
  - PC: 12 columns, gutter 24px
  - Tablet: 8 columns, gutter 20px
  - Mobile: 4 columns, gutter 16px

### 6.3 Vertical Rhythm / 垂直リズム
- JA/EN:
  - Section spacing: PC 96px / Tablet 72px / Mobile 56px
  - Large element gap: 32px
  - Medium element gap: 20px
  - Small element gap: 8px

### 6.4 Radius / 角丸
- JA/EN:
  - Card / modal: 12px
  - Button / input: 10px
  - Tag / badge: 8px

### 6.5 Shadow / シャドウ
- JA/EN:
  - Base card: `0 6px 18px rgba(44, 44, 44, 0.10)`
  - Emphasis/hover: `0 12px 28px rgba(44, 44, 44, 0.14)`
  - Focus ring: `0 0 0 3px rgba(44, 44, 44, 0.14)`

## 7. Responsive Rules / レスポンシブル規則
- JA/EN:
  - PC: `>= 1024px`
  - Tablet: `768px - 1023px`
  - Mobile: `<= 767px`
- JA: レイアウト崩れを避けるため、情報優先順位を維持したまま段階的に1カラム化する。
- EN: Collapse to fewer columns progressively while preserving information priority.

## 8. Content and CTA Rules / コンテンツ・CTA規則
- JA: Hero 直下・中段・予約近接位置に CTA を配置し、予約意図を継続的に支援する。
- EN: Place CTAs at hero, mid-content, and booking-adjacent positions to maintain conversion momentum.
- JA: 予約判断に必要な情報（価格・時間・対象者・FAQ・レビュー）を分散させず、意思決定の近くに置く。
- EN: Keep decision-critical information (price, duration, audience fit, FAQ, reviews) close to booking actions.

## 9. Governance / 運用ルール
- JA: Header / Side Navi / Footer は共通化し、全ページで整合を保つ。
- EN: Header, side navigation, and footer must be shared components to ensure consistency across pages.
- JA: 新規ページ作成時は、本ガイドの色・タイポ・余白規則を優先し、独自値は理由を記録する。
- EN: For new pages, follow this guide’s colour, typography, and spacing tokens; document any exceptions with rationale.
- JA: ナビゲーション配置ルール（Workshop 管理導線）は以下を標準とする。
- EN: Navigation placement rules for workshop management links are standardised as follows.
  - JA: `Workshop予約管理` と `Workshopプラン管理` は管理画面サイドナビ（Dashboard配下）を正本導線とする。
  - EN: `Workshop Bookings` and `Workshop Plans` are canonical entry points in the admin sidebar under Dashboard.
  - JA: 公開グローバルナビには管理用の詳細導線（Bookings/Plans）を増設しない。公開側は `Admin` 入口のみ保持する。
  - EN: Do not expose admin detail links (Bookings/Plans) in public global nav; keep only the `Admin` entry on public pages.
  - JA: 公開側の `workshop-booking.html` と `workshop-plans.html` は相互リンクで往復可能とし、比較→予約の文脈を維持する。
  - EN: Keep bidirectional linking between `workshop-booking.html` and `workshop-plans.html` to preserve comparison-to-booking context.

## 10. Sources / 参照元
- `references/design/05-wireframe.html`
- `references/design/06-design-guide.html`
- `references/design/01-proposal.html`








