# Workshop Booking SQL Runbook

## 目的

この資料は、Workshop 予約 Draft を実装可能な状態へ進めるために、追加テーブルと `bookings` 拡張を Supabase に適用する手順書です。

対象 SQL:

1. [`sql/05_create_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/05_create_workshop_booking_tables.sql)
2. [`sql/06_verify_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/06_verify_workshop_booking_tables.sql)

補助設計:

- [`docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md)

## この SQL で行うこと

- 新規テーブル作成
  - `workshop_plans`
  - `workshop_plan_inclusions`
- `workshop_plan_flow_steps`
- `workshop_sessions`
- 既存 `bookings` への列追加
  - `session_id`
  - `plan_id`
  - `quoted_price_jpy`
  - `currency_code`
  - `booking_method`
  - `contact_name`
  - `contact_email`
  - `contact_phone`
  - `party_size`
  - `special_requests`
  - `internal_note`
  - `confirmed_at`
- 既存/新規テーブルの人数・通貨関連補足
  - `workshop_plans.currency_code`（初期 `JPY`）
  - `workshop_sessions.currency_code`（初期 `JPY`）
  - `workshop_sessions.min_party_size` / `max_party_size`（未設定時はプランを継承想定）
- インデックス追加
- 基本 CHECK 制約追加

## 実行前の注意

1. Supabase の対象環境が `bookings / enquiries` rename 後であることを確認する
2. 既存 `bookings` に実データがある場合、列追加による影響を理解したうえで実施する
3. まずは開発環境で実行し、問題がなければ本番へ進める
4. RLS はこの SQL では追加していない

## 手順

### Step 1. SQL を確認する

次の2ファイルを開いて内容を確認します。

- [`sql/05_create_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/05_create_workshop_booking_tables.sql)
- [`sql/06_verify_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/06_verify_workshop_booking_tables.sql)

### Step 2. Supabase SQL Editor で作成 SQL を実行する

[`sql/05_create_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/05_create_workshop_booking_tables.sql) を Supabase SQL Editor に貼り付けて実行します。

期待結果:

- `Success. No rows returned`

### Step 3. 検証 SQL を実行する

[`sql/06_verify_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/06_verify_workshop_booking_tables.sql) を実行します。

確認ポイント:

- `workshop_plans`
- `workshop_plan_inclusions`
- `workshop_plan_flow_steps`
- `workshop_sessions`

が存在すること。

加えて、`bookings` に次の列が存在すること。

- `session_id`
- `plan_id`
- `quoted_price_jpy`
- `booking_method`
- `contact_name`
- `contact_email`
- `contact_phone`
- `party_size`
- `special_requests`
- `internal_note`
- `confirmed_at`

### Step 4. 初期データ投入方針を決める

この時点ではテーブルだけ作成されます。  
画面に実データを出すには、次のどちらかが必要です。

1. Supabase SQL Editor で seed を追加する
2. 管理画面から `Workshop Plans` / `Workshop Sessions` を編集できる UI を先に作る

現時点の推奨は、まず少量の seed を入れて public 側の表示検証を進めることです。

## まだ含めていないもの

- RLS policy
- seed data
- `booking_status_logs` への自動記録 trigger
- `capacity_reserved` 自動更新 trigger

これらは、予約入力画面の仕様確定後に追加する方が安全です。

## 次にやること

1. この SQL を開発環境へ適用する
2. `workshop_plans` と `workshop_sessions` の seed を設計する
3. `subpages/workshop-booking.html` を実データ参照へ置き換える
4. その後に予約入力フォーム本体へ進む


