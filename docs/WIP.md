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
3. 予約項目整理後に `bookings / enquiries` の追加項目有無を判断する

### 明日の確認ポイント
- `#reserve` から遷移すべき予約画面の役割が明確か
- `subpages/workshop-booking.html` Draft の UI 構成が要件整理のたたき台として十分か
- 必須入力項目と任意入力項目を切り分けられるか
- `bookings / enquiries` に追加すべき列があるか
- サイドバー下部の `Admin build` が `20260322a` になっているか

### 明日の報告フォーマット
- `予約導線の起点:` 確認済み / 未確認
- `現行CTA:` `./workshop-booking.html` / その他
- `Draft UI:` 良好 / 要改善
- `必要入力項目:` 整理済み / 未整理
- `Admin build:` 20260322a / その他
- `Console:` エラーなし / エラーあり
- `補足:` 必要に応じて詳細

### 次の実装候補
- `subpages/workshop-booking.html` Draft を基に予約項目を固める
- 予約入力項目に基づき `bookings / enquiries` の必要列を整理する
- その後に `bookings / enquiries` 管理画面へ着手する

### 確認済み事項
- `docs/admin-implementation-status.md` は更新済み
- `css/style.css` は未変更
- 本ファイル作成後、日本語の文字化けが発生していないことを再読込で確認する
