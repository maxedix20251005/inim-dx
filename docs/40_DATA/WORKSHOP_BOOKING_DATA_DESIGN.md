# Workshop Booking Data Design

## 目的

この資料は、Workshop 予約画面 Draft を実運用へ進めるために必要なデータ設計のたたき台です。  
対象は、公開側 [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) で表示する次の情報です。

- 日付ごとの空き状況
- 選択日の時間帯一覧
- 選択したプランの詳細情報
- 体験の流れ
- 集合場所 / 体験場所
- 注意事項 / キャンセルポリシー

英語表記は Australian English に統一します。

## 設計方針

- 予約の実体は既存の `bookings` を使う
- ステータス履歴は `booking_status_logs` を使う
- 予約入力画面で必要な公開情報は、`bookings` 本体とは分離して管理する
- そのため、公開画面の表示用に次の4テーブルを追加する
  - `workshop_plans`
  - `workshop_plan_flow_steps`
  - `workshop_plan_inclusions`
  - `workshop_sessions`

この分離により、次を両立できます。

- 管理者がプラン内容を更新しやすい
- 予約可能枠の追加 / 非公開 / 満席制御をしやすい
- `bookings` を「実際の申込データ」に集中させられる

## 推奨テーブル構成

### 1. `workshop_plans`

プランのマスタです。  
「プラン情報」タブの大半はこのテーブルを中心に表示します。

| カラム名 | 型 | 必須 | 用途 |
|---|---|---:|---|
| `id` | UUID | Yes | PK |
| `plan_code` | VARCHAR(50) | Yes | 内部識別子。`asakusa_standard_60` など |
| `plan_name` | VARCHAR(120) | Yes | 表示名 |
| `plan_summary` | TEXT | Yes | 一覧用の短い説明 |
| `plan_description` | TEXT | Yes | 詳細タブ本文 |
| `booking_label` | VARCHAR(120) | No | 予約欄に出す短い名称 |
| `duration_min_minutes` | SMALLINT | Yes | 最短所要時間 |
| `duration_max_minutes` | SMALLINT | No | 最長所要時間 |
| `base_price_jpy` | INTEGER | Yes | 基本料金 |
| `currency_code` | VARCHAR(3) | Yes | 価格通貨（初期 `JPY`） |
| `pair_price_jpy` | INTEGER | No | ペア料金 |
| `min_party_size` | SMALLINT | Yes | 最少予約人数 |
| `max_party_size` | SMALLINT | Yes | 最大予約人数 |
| `available_period_start` | DATE | No | 販売開始日 |
| `available_period_end` | DATE | No | 販売終了日 |
| `meeting_place_text` | TEXT | No | 集合場所の説明 |
| `experience_place_text` | TEXT | No | 体験場所の説明 |
| `access_text` | TEXT | No | アクセス説明 |
| `cancellation_policy_text` | TEXT | No | キャンセル規定 |
| `notice_text` | TEXT | No | 注意事項まとめ |
| `hero_asset_id` | UUID | No | `content_assets.id` FK |
| `status` | VARCHAR(20) | Yes | `draft` / `active` / `inactive` |
| `sort_order` | SMALLINT | Yes | 表示順 |
| `created_by` | UUID | No | `user_profiles.id` FK |
| `updated_by` | UUID | No | `user_profiles.id` FK |
| `created_at` | TIMESTAMPTZ | Yes | 作成日時 |
| `updated_at` | TIMESTAMPTZ | Yes | 更新日時 |

### 2. `workshop_plan_inclusions`

「含まれるもの」をリストで管理します。  
TEXT 1本に詰め込まない方が、管理画面で追加・並び替えしやすいです。

| カラム名 | 型 | 必須 | 用途 |
|---|---|---:|---|
| `id` | UUID | Yes | PK |
| `plan_id` | UUID | Yes | `workshop_plans.id` FK |
| `inclusion_text` | VARCHAR(255) | Yes | 含まれる項目 |
| `display_order` | SMALLINT | Yes | 表示順 |
| `created_at` | TIMESTAMPTZ | Yes | 作成日時 |
| `updated_at` | TIMESTAMPTZ | Yes | 更新日時 |

### 3. `workshop_plan_flow_steps`

「体験の流れ」タブ用です。  
画像付きカードを管理できます。

| カラム名 | 型 | 必須 | 用途 |
|---|---|---:|---|
| `id` | UUID | Yes | PK |
| `plan_id` | UUID | Yes | `workshop_plans.id` FK |
| `step_no` | SMALLINT | Yes | 手順番号 |
| `step_title` | VARCHAR(120) | Yes | タイトル |
| `step_description` | TEXT | Yes | 説明文 |
| `asset_id` | UUID | No | `content_assets.id` FK |
| `display_order` | SMALLINT | Yes | 表示順 |
| `created_at` | TIMESTAMPTZ | Yes | 作成日時 |
| `updated_at` | TIMESTAMPTZ | Yes | 更新日時 |

### 4. `workshop_sessions`

カレンダーと時間帯一覧の正本です。  
1レコード = 1つの予約枠です。

| カラム名 | 型 | 必須 | 用途 |
|---|---|---:|---|
| `id` | UUID | Yes | PK |
| `plan_id` | UUID | Yes | `workshop_plans.id` FK |
| `store_id` | UUID | Yes | `Shops.id` FK |
| `session_date` | DATE | Yes | 開催日 |
| `gather_time` | TIME | Yes | 集合時間 |
| `start_time` | TIME | Yes | 開始時間 |
| `end_time` | TIME | Yes | 終了時間 |
| `booking_method` | VARCHAR(20) | Yes | `instant` / `request` |
| `min_party_size` | SMALLINT | No | セッション固有の最小人数（未設定時はプランを継承） |
| `max_party_size` | SMALLINT | No | セッション固有の最大人数（未設定時はプランを継承） |
| `capacity_total` | SMALLINT | Yes | 総席数 |
| `capacity_reserved` | SMALLINT | Yes | 予約済数 |
| `session_status` | VARCHAR(20) | Yes | `open` / `limited` / `full` / `closed` / `cancelled` |
| `price_override_jpy` | INTEGER | No | 当日枠だけ価格を変える場合 |
| `currency_code` | VARCHAR(3) | Yes | 価格通貨（初期 `JPY`） |
| `public_note` | VARCHAR(255) | No | 「残席1」など |
| `request_deadline_at` | TIMESTAMPTZ | No | リクエスト予約の締切 |
| `published_at` | TIMESTAMPTZ | No | 公開開始日時 |
| `created_by` | UUID | No | `user_profiles.id` FK |
| `updated_by` | UUID | No | `user_profiles.id` FK |
| `created_at` | TIMESTAMPTZ | Yes | 作成日時 |
| `updated_at` | TIMESTAMPTZ | Yes | 更新日時 |

## 既存 `bookings` に追加したいカラム

予約入力画面を実装する前提で、既存 `bookings` には次の追加を推奨します。

| カラム名 | 型 | 必須 | 理由 |
|---|---|---:|---|
| `session_id` | UUID | Yes | どの予約枠を申し込んだかを保持するため |
| `plan_id` | UUID | Yes | 後からプラン変更があっても、申込時点のプランを追えるようにするため |
| `quoted_price_jpy` | INTEGER | Yes | 申込時点の価格を固定保存するため |
| `currency_code` | VARCHAR(3) | Yes | 価格通貨（初期 `JPY`） |
| `booking_method` | VARCHAR(20) | Yes | `instant` / `request` を申込時点で残すため |
| `contact_name` | VARCHAR(120) | Yes | 参加代表者名 |
| `contact_email` | VARCHAR(255) | Yes | 確認メール送信用 |
| `contact_phone` | VARCHAR(40) | No | 直前連絡用 |
| `party_size` | SMALLINT | Yes | 参加人数 |
| `special_requests` | TEXT | No | 香りの希望、同伴、配慮事項など |
| `internal_note` | TEXT | No | 管理側メモ |
| `confirmed_at` | TIMESTAMPTZ | No | 即時予約 / 手動確定の時刻 |

## 追加変更（2026-03-25 Step1）
- 価格の多通貨対応を見据え、`currency_code`（3桁ISO、初期 `JPY`）を `workshop_plans` / `workshop_sessions` / `bookings` に追加。
- 予約人数の制約をセッション単位で調整できるよう `workshop_sessions.min_party_size` / `max_party_size` を追加（未設定時はプラン値で解釈）。
- Rollback 方針: 既存データがない Draft 段階のため、元に戻す際は同名カラムを `alter table ... drop column` で削除し、`05_create_workshop_booking_tables.sql` / `06_verify_workshop_booking_tables.sql` を元版へ戻す。運用データ投入後は drop せずに非使用カラムとして運用することを推奨。

### 実行ログ（2026-03-25）
- 反映: `05_create_workshop_booking_tables.sql`（再実行安全）
- 反映: `07_add_currency_code_and_party_limits.sql`（本番 Supabase 適用）
- 検証: `08_verify_workshop_booking_schema.sql` にて対象カラム/インデックスの存在を確認

## カレンダー表示ロジック

公開側カレンダーの状態は `workshop_sessions` から次のように算出します。

- `○ 即時予約可`
  - `booking_method = 'instant'`
  - `session_status = 'open'`
  - `capacity_reserved < capacity_total`

- `□ リクエスト予約可`
  - `booking_method = 'request'`
  - `session_status = 'open'`

- `△ 残席数少ない`
  - `session_status = 'limited'`
  - もしくは `capacity_total - capacity_reserved <= 2`

- `× 空き無し`
  - `session_status = 'full'`
  - もしくは `capacity_reserved >= capacity_total`

- `- 開催無し`
  - 該当日の `workshop_sessions` が存在しない
  - もしくは `session_status = 'closed'`

## 管理画面で必要になる入力画面

次段階で必要な管理画面は次の2つです。

1. `Workshop Plans`
- プラン名
- 説明文
- 所要時間
- 料金
- 含まれるもの
- 流れカード
- 集合場所 / 体験場所
- 注意事項

2. `Workshop Sessions`
- 開催日
- 集合時間
- 開始 / 終了時間
- 即時予約 / リクエスト予約
- 定員
- 残席管理
- 公開 / 非公開

## 推奨理由

この設計にすると、次を分離できます。

- `workshop_plans`: 体験内容
- `workshop_sessions`: 予約可能枠
- `bookings`: 実際の申込

この3層に分けるのが、予約システムでは最も破綻しにくい構成です。  
プラン内容変更、価格変更、枠追加、満席管理、履歴管理をそれぞれ無理なく扱えます。
