## WIP: inim-dx 管理画面 実装引継ぎメモ

### このメモの目的
- このファイルは、翌日に迷わず再開できるように、今日の作業状況と未解決事項を整理した一時メモです。
- 管理画面に追加・更新を行った場合は、`docs/admin-implementation-status.md` と合わせて更新する前提です。
- 不具合履歴の正本は `docs/ISSUE_LIST.md` とし、新しい Issue があれば同時に追記します。

### 今日時点で完了していること
- 公開サイト用の `js/site-shell.js` / `css/style.css` には手を入れず、管理画面専用の描画を分離した
- 管理画面専用ファイルを追加した
  - `js/admin-app.js`
  - `css/admin-app.css`
  - `app/pages/journey.html`
- `app/` 配下HTMLの参照先を、管理画面専用アセットへ切り替えた
- Supabase セッション確認、ログイン、ログアウト、パスワード再設定送信、パスワード更新の基本導線を実装した
- DB 設計書 `08-db-design.html` に合わせて以下を反映した
  - `user_profiles.auth_user_id` によるプロフィール取得
  - `user_role_assignments.user_profile_id` と `roles.role_code` によるロール取得
  - `top_hero_items` の固定フォーム化
  - `journey_steps` の固定フォーム化
- `content_assets` を取得し、トップ編集の `asset_id` を選択式に変更した
- `top_hero_items` の基本入力バリデーションを追加した
- `cta_url` は `abc` のような裸の相対文字列を通さないよう厳密化した
- `top_hero_items` で `abc` の保存がブロックされることを確認した
- `journey_steps` の基本入力バリデーションを追加した
- `journey_steps` の保存処理自体にも入力バリデーションを追加し、空欄の `0` 化を防ぐようにした
- 保存成功時に、通知へレコード名と保存時刻を表示するようにした
- 一覧テーブルで直近更新行に `更新済み` バッジとハイライトを出すようにした
- 保存後も編集中レコードの選択状態を維持するようにした
- 保存直後の再取得でも通知が消えないようにした
- `更新済み` バッジを改行しにくくした
- `content_assets` にキーワード検索とバケット絞り込み UI を追加した
- ダッシュボードと公開管理に `bookings / enquiries` の直近一覧を追加した
- `画像アセットID` の横に、フィルタの使い方説明を追加した
- トップ編集と導線設定の左右パネル比率を調整した
- 画面・docs・コード上の呼称を `bookings / enquiries` に統一した
- Supabase rename migration 後の `bookings` / `enquiries` / `booking_type` / `booked_at` へコード参照を更新した
- 管理画面 HTML のバージョン文字列を `20260322a` に更新した
- サイドバーの `セッション確認` ボタン背景をグレー系、文字色を明色へ変更した
- `セッション確認` ボタンの視認性改善が反映されていることを確認した
- サイドバー下部に `Admin build` 表示を追加し、キャッシュ反映状況を画面上で確認できるようにした
- 実装整理資料として `docs/admin-implementation-status.md` を追加・更新した
- 再発防止用に `docs/ISSUE_LIST.md` を追加した

### 今日発生した問題
#### 1. `login.html` が真っ白になった件
- 原因: `js/admin-app.js` のテンプレート文字列内に生のバッククォート記法を書いてしまい、JavaScript の構文エラーになっていた
- 例: `` `user_profiles` `` のような記述
- 対応: 問題箇所を修正済み

#### 2. `login.html` が一瞬表示されたあとダッシュボードへ飛ぶ件
- 原因: 有効な Supabase セッションが残っているため、`appLogin` で自動的に `appDashboard` へリダイレクトされていた
- 実装上は想定内
- 該当処理: `js/admin-app.js`
  - `if (pageKey === "appLogin" && state.user) return redirect("appDashboard");`

#### 3. パスワード再設定フローの確認
- 最新確認結果:
  - 実際のメールリンクは `redirect_to=https://maxedix20251005.github.io/inim-dx/app/password/reset.html` になった
  - パスワード再設定は成功した
- ここまでの対応:
  - `forgot-password` 送信時の `redirectTo` を `app/password/reset.html` に固定
  - `js/site-config.js` に `adminResetRedirectUrl` を追加
  - `app/password/forgot.html` に現在のページURL、設定値、実際の `redirectTo` を表示

### 現在の推定原因
- パスワード再設定フローは解消した
- ログイン後のプロフィール取得、ロール表示、`account_status` 表示は正常化した
- Console エラーも解消済み
- 現在の主な未解決事項は、Workshop 予約画面で必要な入力項目をどこまで持たせるかの整理です
- 2026-03-22 時点で、DB rename migration は実行済みで、実DB の現行名称は `bookings`, `booking_status_logs`, `enquiries`, `enquiry_status_logs` です
- 英語表記が必要な場合は Australian English に統一します
- 2026-03-22 の現状把握で、[`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `#reserve` セクションは存在するが、予約CTAはまだ `../index.html#contact` に接続されていることを確認しました
- その後、[`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) の Draft を追加し、`workshop.html` の CTA はそこへ差し替えました
- この対応で、公開側の最小差分として `js/site-shell.js` と `subpages/workshop.html` を更新しています
- 予約ページ Draft には、空き状況カレンダー、選択日の時間帯表示、集合時間、料金、`予約へ進む` ボタン、詳細4タブを実装しています
- 2026-03-22 の改修で、カレンダー記号は記号のみ表示へ調整し、選択中の日付をカレンダー直下にも表示するようにしました
- 2026-03-22 の追加入力で、[`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html) を追加し、`予約へ進む` から日時・料金・予約方式を引き継いで入力 Draft へ進めるようにしました
- 2026-03-22 の調整で、`確認 Draft を表示する` は入力 validity とポリシー同意が揃うまで disabled に変更し、`参加人数` の縦位置も揃えました
- `file://` 直開きでのクエリ付き遷移警告に備え、予約入力画面への遷移 URL は `new URL()` で組み立てる方式へ変更しました
- 2026-03-22 の確認結果を受けて、予約入力 Draft の STEP 表示は `STEP 1 = 完了済み`, `STEP 2 = 処理中で強調`, `STEP 3 = 次段階` の見せ方へ調整しました
- 2026-03-22 の追加実装で、[`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html) を追加し、STEP 2 の入力内容と選択枠を確認画面へ引き継げるようにしました
- 2026-03-22 の追加調整で、確認画面から STEP 2 に戻った際も、入力済みの代表者情報と人数を保持して再編集できるようにしました
- 2026-03-22 の追加実装で、STEP 2 の入力 validity check として `contact_name` 必須、`contact_email` 必須 + 形式、`contact_phone` 必須 + 電話番号形式、`party_size` 1〜4名必須選択を実装しました
- 2026-03-22 の追加調整で、STEP 2 の必須ラベルには赤 `*` を付与し、blur 時に各フィールド下へエラー表示を出すようにしました。電話番号は固定電話 / 携帯電話・IP 電話を判定して桁数を確認し、入力中に `-` を自動整形するようにしました
- 2026-03-22 の追加調整で、電話番号の局番判定を詳細化し、`03 / 06`、主要な 3 桁市外局番、その他固定電話、`050 / 070 / 080 / 090`、`0120`、`0800`、`0570` を認識して `-` パターンと桁数を出し分けるようにしました
- 2026-03-22 の追加実装で、STEP 1 → STEP 2 → STEP 3 の遷移時に `date_key`, `store`, `storeLabel`, `plan_id`, `session_id` をクエリ引き継ぎするようにしました
- 2026-03-22 の追加実装で、[`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html) の送信を Supabase `bookings` 保存へ接続しました
- 保存時はログイン中ユーザーの `user_profiles.id` を `customer_profile_id` に使い、店舗名から `stores.id` を解決して保存します
- ログイン未実施時やプロフィール未解決時は、確認画面上でエラー表示し、`account.html#login` へ誘導します
- 2026-03-22 の追加調整で、予約導線のキャッシュ判別用に `build=20260322b` をクエリ引き継ぎし、確認画面に `Booking build` 表示を追加しました
- 2026-03-23 の追加調整で、`store_id` 解決は `stores` 一覧に対する表記ゆれ吸収マッチへ変更し、`浅草店が見つからない` エラーの対策を入れました
- `app/` 配下も確認しましたが、現時点では電話番号入力フィールド自体が存在しないため、同ロジックの適用対象はまだありません。今後 `app` 側に電話番号入力を追加する際は、同等の validity と整形を適用する前提です
- 2026-03-22 の導線整理で、`workshop.html` の `予約する` と 3 コースの各予約ボタンは、いったんすべて `./workshop-booking.html` へ統一しました
- 同日の追加調整で、`行き先を選ぶ` で選択した店舗を `store` クエリとして `workshop-booking.html` へ引き継ぎ、予約画面側でも選択状態を維持するようにしました
- DB 追加は不要でした。`workshop_sessions.store_id` と既存 `bookings.store_id` がすでに存在するため、SQL `07_` は未作成です
- 2026-03-22 のユーザー確認で、店舗引き継ぎ、予約画面の店舗選択表示、選択店舗の開催日のみ表示はすべて正常、Console エラーなしを確認しました
- Reminder: `workshop_plans` / `workshop_sessions` 確定後に、予約画面で各プランをどう見せるか、各コースボタンから何を初期反映するかを再設計する
- Workshop 予約の推奨データ設計は [`docs/workshop-booking-data-design.md`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/docs/workshop-booking-data-design.md) に整理しました
- 追加テーブル作成 SQL は [`sql/05_create_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/05_create_workshop_booking_tables.sql)、検証 SQL は [`sql/06_verify_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/06_verify_workshop_booking_tables.sql) に追加しました
- 実行手順は [`docs/workshop-booking-sql-runbook.md`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/docs/workshop-booking-sql-runbook.md) に整理しました
- 2026-03-22 の実確認で、カレンダー記号は良好、SQL ファイル構成は良好、Runbook も良好でした
- 同日の検証で、追加テーブル、`bookings` 追加列、関連 index の存在確認まで完了しました
- 次は `bookings / enquiries` 管理画面の詳細化ではなく、この Draft を基に public 側の Workshop 予約項目を先に固める方針です
- 2026-03-21 の最終確認では、アセット説明文は良好、トップ編集の左右比率は良好、導線設定の左右比率は微調整余地ありという結果でした
- 管理画面 HTML の CSS / JS 参照にはバージョン文字列を付け、古い JS キャッシュが残りにくいようにしています
- 2026-03-21 の確認では、`journey_steps` でフロントバリデーションをすり抜け、Supabase 側の制約エラーまで到達するケースがありました
- これに対して、フォーム送信前チェックに加え、`saveRecord()` 側でも `journey_steps` の入力検証を必ず通すように修正しました
- 2026-03-21 の実画面確認で、`journey_steps` の各バリデーションは正常動作し、正常値保存、Console エラーなしまで確認しました
- `content_assets` の検索欄とバケット絞り込みは、2026-03-21 の実画面で表示確認まで完了しました
- ダッシュボードと公開管理に追加した `bookings / enquiries` 一覧は、2026-03-21 の実画面確認で正常でした
- 導線設定の左右比率微調整は残課題ですが、優先度は Workshop 予約導線設計の後ろです

### 明日最初にやること
1. [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `#reserve` セクションを起点に、Workshop 予約画面の必要項目を整理する
2. `予約フォームへ進む` が `./workshop-booking.html` を向いていることを確認する
3. [`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html) を見ながら、予約入力項目と public 側フローを固める

### 明日の確認ポイント
- `#reserve` から遷移すべき予約画面の役割が明確か
- `subpages/workshop-booking.html` Draft の UI 構成が要件整理のたたき台として十分か
- `subpages/workshop-booking-entry.html` の入力項目と確認導線が過不足ないか
- 必須入力項目と任意入力項目を切り分けられるか
- `workshop_plans` / `workshop_sessions` を追加する前提で不足がないか
- サイドバー下部の `Admin build` が `20260322a` になっているか

### 明日の報告フォーマット
- `予約導線の起点:` 確認済み / 未確認
- `現行CTA:` `./workshop-booking.html` / その他
- `Draft UI:` 良好 / 要改善
- `必要入力項目:` 整理済み / 未整理
- `推奨テーブル設計:` 良好 / 要改善
- `SQL runbook:` 良好 / 要改善
- `Admin build:` 20260322a / その他
- `Console:` エラーなし / エラーあり
- `補足:` 必要に応じて詳細

### 次の実装候補
- `subpages/workshop-booking.html` Draft を基に予約項目を固める
- 予約保存成功後の完了画面（thanks）を追加し、ユーザー向けの完了導線を確定する
- `workshop_sessions` 実データ連携で `session_id` / `plan_id` を確定値で保存する
- その後に `bookings / enquiries` 管理画面へ着手する

### 確認済み事項
- `docs/admin-implementation-status.md` は更新済み
- `css/style.css` は未変更
- 本ファイル作成後、日本語の文字化けが発生していないことを再読込で確認する
