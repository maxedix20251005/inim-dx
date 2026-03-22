# SQL Migration Plan

## 目的

この資料は、既存 Supabase 環境で旧テーブル名を新テーブル名へ移行するための手順書です。  
対象は以下の 4 テーブルと関連カラムです。

- `reservations` → `bookings`
- `reservation_status_logs` → `booking_status_logs`
- `inquiries` → `enquiries`
- `inquiry_status_logs` → `enquiry_status_logs`

あわせて、次のカラム名も変更します。

- `reservation_type` → `booking_type`
- `reserved_at` → `booked_at`
- `reservation_id` → `booking_id`
- `inquiry_id` → `enquiry_id`

## 前提

- 既存 DB には **旧テーブル名がそのまま存在している**
- データは保持したまま移行したい
- 再構築ではなく rename ベースで移行する
- RLS は旧テーブル名向け policy が既に入っている可能性がある

## 使用する SQL

1. [sql/00-2b_precheck_rename_reservation_inquiry_tables.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\00-2b_precheck_rename_reservation_inquiry_tables.sql)
2. [sql/00-3_rename_reservation_inquiry_tables.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\00-3_rename_reservation_inquiry_tables.sql)
3. [sql/03_rls_policies.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\03_rls_policies.sql)
4. [sql/00-4_postcheck_rename_reservation_inquiry_tables.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\00-4_postcheck_rename_reservation_inquiry_tables.sql)
5. [sql/02_verify_seed_data.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\02_verify_seed_data.sql)

## 実行前の注意

1. Supabase でバックアップまたはスナップショットを取得する
2. 本番ではメンテナンス時間帯に実施する
3. 先にアプリ側 SQL やフロント実装が新名称に追随していることを確認する
4. 旧名と新名が混在している中途半端な状態で `seed.sql` を再投入しない

## 手順

### Step 1. 事前確認

[sql/00-2b_precheck_rename_reservation_inquiry_tables.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\00-2b_precheck_rename_reservation_inquiry_tables.sql) を実行します。

確認ポイント:

- 旧テーブル
  - `reservations`
  - `reservation_status_logs`
  - `inquiries`
  - `inquiry_status_logs`
  が `exists`
- 新テーブル
  - `bookings`
  - `booking_status_logs`
  - `enquiries`
  - `enquiry_status_logs`
  が `missing`
- 旧カラム `reservation_type` / `reserved_at` / `reservation_id` / `inquiry_id` が存在する
- 旧インデックス名と旧 policy 名が存在する

この時点の件数は控えておきます。移行後に一致確認します。

### Step 2. rename migration 実行

[sql/00-3_rename_reservation_inquiry_tables.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\00-3_rename_reservation_inquiry_tables.sql) を実行します。

この SQL が行うこと:

- 旧 RLS policy の削除
- 旧テーブル名の rename
- 旧カラム名の rename
- 主要 FK 制約名の rename
- 主要インデックス名の rename
- 新テーブル名側で RLS を有効状態に維持

### Step 3. RLS 再適用

[sql/03_rls_policies.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\03_rls_policies.sql) を再実行します。

理由:

- rename 前の旧 policy は削除済み
- 新テーブル名に対して policy を再作成する必要がある

### Step 4. 移行後確認

[sql/00-4_postcheck_rename_reservation_inquiry_tables.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\00-4_postcheck_rename_reservation_inquiry_tables.sql) を実行します。

確認ポイント:

- 旧テーブル名が `missing`
- 新テーブル名が `exists`
- 新カラム `booking_type` / `booked_at` / `booking_id` / `enquiry_id` が存在する
- 新インデックス名が存在する
- 新 policy 名が存在する
- 件数が事前確認と一致する

### Step 5. 最終確認

[sql/02_verify_seed_data.sql](c:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\sql\02_verify_seed_data.sql) を実行します。

期待する確認内容:

- `bookings`
- `enquiries`
- `booking_status_logs`
- `enquiry_status_logs`

の件数が既存データと一致していること。

## 想定結果

移行完了後は、設計書・SQL・RLS・検証 SQL の正本が以下に揃います。

- `bookings`
- `booking_status_logs`
- `enquiries`
- `enquiry_status_logs`
- `booked_at`
- `booking_type`
- `booking_id`
- `enquiry_id`

## 実行結果
#00-2b precheck result
| tablename               | policyname                                |
| ----------------------- | ----------------------------------------- |
| inquiries               | inquiries_insert_anon_or_own              |
| inquiries               | inquiries_select_own_or_management        |
| inquiries               | inquiries_update_management               |
| inquiry_status_logs     | inquiry_status_logs_insert_management     |
| inquiry_status_logs     | inquiry_status_logs_select_management     |
| reservation_status_logs | reservation_status_logs_insert_management |
| reservation_status_logs | reservation_status_logs_select_management |
| reservations            | reservations_insert_own_or_management     |
| reservations            | reservations_select_own_or_management     |
| reservations            | reservations_update_own_or_management     |

#00-3 rename result
Success. No rows returned

#03 rls policies result
Success. No rows returned

#00-4 postcheck result
| id                                   | category    | status      | created_at                  |
| ------------------------------------ | ----------- | ----------- | --------------------------- |
| bbbb0001-0000-4000-8000-000000000001 | general     | completed   | 2026-03-20 08:43:59.8951+00 |
| bbbb0003-0000-4000-8000-000000000003 | pricing     | in_progress | 2026-03-20 08:43:59.8951+00 |
| bbbb0004-0000-4000-8000-000000000004 | partnership | pending     | 2026-03-20 08:43:59.8951+00 |
| bbbb0005-0000-4000-8000-000000000005 | media       | completed   | 2026-03-20 08:43:59.8951+00 |
| bbbb0002-0000-4000-8000-000000000002 | booking     | pending     | 2026-03-20 08:43:59.8951+00 |

##02 verify seed date result
| id                                   | customer_name | category    | subject      | status      | created_at                  |
| ------------------------------------ | ------------- | ----------- | ------------ | ----------- | --------------------------- |
| bbbb0001-0000-4000-8000-000000000001 | テストユーザーA      | general     | 初回体験の流れを知りたい | completed   | 2026-03-20 08:43:59.8951+00 |
| bbbb0003-0000-4000-8000-000000000003 | anonymous     | pricing     | 法人向け料金の相談    | in_progress | 2026-03-20 08:43:59.8951+00 |
| bbbb0004-0000-4000-8000-000000000004 | anonymous     | partnership | コラボイベントのご相談  | pending     | 2026-03-20 08:43:59.8951+00 |
| bbbb0005-0000-4000-8000-000000000005 | anonymous     | media       | 取材依頼         | completed   | 2026-03-20 08:43:59.8951+00 |
| bbbb0002-0000-4000-8000-000000000002 | anonymous     | booking     | 予約変更は可能ですか   | pending     | 2026-03-20 08:43:59.8951+00 |

#inim-dx app reflection result
- `js/admin-app.js` の DB 参照を rename 後の名称へ更新
  - `reservations` → `bookings`
  - `inquiries` → `enquiries`
  - `reservation_type` → `booking_type`
  - `reserved_at` → `booked_at`
- ダッシュボード / 公開管理の read-only 一覧を新名称へ追随
- `js/site-shell.js` の `Workshop Admin` 表記を `Workshop Bookings` に更新
- 管理画面 HTML のアセット参照バージョンを `20260322a` に更新
- 既存の `booking_status_logs` / `enquiry_status_logs` は現時点の管理画面で未使用のため、アプリコード変更なし


## やってはいけないこと

- `sql/00-1_create_app_schema.sql` をそのまま再実行して rename の代わりにしようとする
- 旧テーブルを残したまま新テーブルだけ別作成する
- `sql/03_rls_policies.sql` を migration 前に新旧混在状態で何度も実行する

## 補足

- 既存データを保持したまま移行する場合、正攻法は rename migration です
- もしまだどの環境にも旧テーブルしかなく、今後新規構築だけを行うなら、更新済みの `sql/00-1_create_app_schema.sql` から新名称で作る方が簡単です
