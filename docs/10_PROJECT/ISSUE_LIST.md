# ISSUE LIST / inim-dx

## 1. このドキュメントの目的 / Purpose
- このファイルは、`inim-dx` で発生した不具合、実装上の問題、運用上の詰まりを継続管理するための常設 Issue 一覧です。
- Issue は、発生日、発生箇所、症状、原因、対策、再発防止策が第三者に伝わる粒度で記録します。
- 今後も、`docs/10_PROJECT/PROJECT_STATUS.md` と `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md` とあわせて必ず最新化します。
- 更新後は、日本語の文字化けがないか必ず確認します。

## 2. 記載ルール / Writing Rules
- 1つの Issue につき、1つの節を使います。
- 事実と推定は分けて書きます。
- ユーザー確認結果がある場合は、それも残します。
- 解消済みでも消さず、`状態` を更新して履歴として残します。

### Issue 2026-03-21-01
- `発生日:` 2026-03-21
- `発生箇所:` [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js), [`app/login.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/login.html)
- `症状:` `login.html` が真っ白になり、`Uncaught SyntaxError: Unexpected identifier 'user_profiles'` が発生した
- `原因:` テンプレート文字列内に説明用の生バッククォート記法を書いてしまい、JavaScript 構文エラーになった
- `対策:` 問題のテンプレート文字列を修正した
- `再発防止:` テンプレート文字列内では説明用のバッククォートを直接書かず、必要なら通常文字列へ置き換える
- `状態:` 解消済み

### Issue 2026-03-21-02
- `発生日:` 2026-03-21
- `発生箇所:` [`app/login.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/login.html), [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js)
- `症状:` `login.html` が一瞬表示されたあと、すぐダッシュボードへ遷移した
- `原因:` 有効な Supabase セッションが残っており、`appLogin` から `appDashboard` へ自動リダイレクトする仕様だった
- `対策:` 実装仕様として整理し、ログアウトまたはシークレットウィンドウで切り分けする運用にした
- `再発防止:` ログイン画面検証時は既存セッション有無を先に確認する
- `状態:` 仕様確認済み

### Issue 2026-03-21-03
- `発生日:` 2026-03-21
- `発生箇所:` [`app/password/forgot.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/password/forgot.html), [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js), [`js/site-config.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/site-config.js)
- `症状:` パスワード再設定メールのリンクから `app/password/reset.html` に戻れず、トップページへ遷移していた
- `原因:` `redirect_to` がトップ URL を向いていた
- `対策:` `forgot-password` の `redirectTo` を `app/password/reset.html` に固定し、`js/site-config.js` に `adminResetRedirectUrl` を追加した
- `再発防止:` `app/password/forgot.html` に、現在のページ、設定値、実際に送信へ使う `redirectTo` を表示する切り分け UI を追加した
- `ユーザー確認結果:` 2026-03-21 時点で、実メールの `redirect_to` は `https://maxedix20251005.github.io/inim-dx/app/password/reset.html` となり、パスワード再設定は成功した
- `状態:` 解消済み

### Issue 2026-03-21-04
- `発生日:` 2026-03-21
- `発生箇所:` Supabase Auth, [`app/password/forgot.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/password/forgot.html)
- `症状:` `email rate limit exceeded` により、パスワード再設定メールを連続送信できなかった
- `原因:` 短時間に再設定メールを送信しすぎたため、Supabase の送信制限に到達した
- `対策:` 時間を空けてから 1 回ずつ再送する運用に切り替えた
- `再発防止:` メール再送確認は必ず 1 回ずつ行い、古いメールリンクは使わない
- `状態:` 運用ルール化済み

### Issue 2026-03-21-05
- `発生日:` 2026-03-21
- `発生箇所:` [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js), [`app/users/me.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/users/me.html)
- `症状:` ダッシュボードで `権限: 未取得`、プロフィールカードで `unknown` と表示された
- `原因:` 初期の `user_profiles` 取得が実環境列と噛み合わず `400` を起こし、ロール切り分けも不足していた
- `対策:` `user_profiles` は `select("*")` を優先し、`app/users/me.html` に `user_role_assignments` の取得結果表示を追加した。`role_id` から `roles` を引き直すフォールバックも入れた
- `再発防止:` ロール異常時は、`app/users/me.html` の実データ確認を先に行う
- `ユーザー確認結果:` 2026-03-21 時点で、ロール表示は `Admin`、`account_status` は `active` で正常化した
- `状態:` 解消済み

### Issue 2026-03-21-06
- `発生日:` 2026-03-21
- `発生箇所:` GitHub Pages 配信, 管理画面 HTML
- `症状:` 修正済みのはずの JS が反映されず、古い挙動が残った
- `原因:` GitHub Pages 上で `admin-app.js` / `site-config.js` / `admin-app.css` のキャッシュが残っていた
- `対策:` 管理画面 HTML の参照にバージョン文字列を付与した
- `再発防止:` 管理画面に動作差分を入れた場合は、必要に応じて参照バージョンを更新する。あわせてサイドバー下部に `Admin build` を表示し、目視確認できるようにした
- `ユーザー確認結果:` 2026-03-28 時点で同症状の再発なし（OK to close）。
- `状態:` 解消済み（ユーザー確認済み）

### Issue 2026-03-21-07
- `発生日:` 2026-03-21
- `発生箇所:` 管理画面ページ全般
- `症状:` Console に `/favicon.ico` の `404` が出ていた
- `原因:` favicon の参照先が明示されていなかった
- `対策:` 既存ロゴ画像を `rel="icon"` で指定した
- `再発防止:` 新規 HTML 追加時は favicon 設定を忘れずに含める
- `ユーザー確認結果:` Console エラーなしを確認済み
- `状態:` 解消済み

### Issue 2026-03-21-08
- `発生日:` 2026-03-21
- `発生箇所:` [`app/pages/home.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/pages/home.html), [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js)
- `症状:` `top_hero_items.cta_url` に `abc` を入れても保存されるケースがあった
- `原因:` URL バリデーション追加後も、旧 JS キャッシュが残っていた
- `対策:` `cta_url` を `/` または `http(s)://` 始まりのみ許可する実装を入れ、管理画面 HTML の参照バージョンを更新した
- `再発防止:` バリデーション変更時は、参照バージョン更新と実画面確認をセットで行う
- `ユーザー確認結果:` 2026-03-21 時点で、`abc` の保存はブロックされることを確認済み
- `状態:` 解消済み

### Issue 2026-03-21-09
- `発生日:` 2026-03-21
- `発生箇所:` [`css/admin-app.css`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/css/admin-app.css), 管理画面サイドバー
- `症状:` `セッション確認` ボタンの背景と文字のコントラストが低く、見づらかった
- `原因:` 背景色と文字色の差が不足していた
- `対策:` 背景をグレー系、文字色を明色へ変更した
- `再発防止:` サイドバーの操作ボタンは実画面で視認性確認を行う
- `ユーザー確認結果:` 2026-03-21 時点で、見やすいことを確認済み
- `状態:` 解消済み

### Issue 2026-03-21-10
- `発生日:` 2026-03-21
- `発生箇所:` [`app/pages/journey.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/pages/journey.html), [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js)
- `症状:` `journey_steps` で空欄の `step_no` が `0` として保存されたり、`step_name` 空欄や `link_url = abc` がバックエンド制約エラーまで到達した
- `原因:` フロント側バリデーションだけでは取りこぼしがあり、`saveRecord()` 側で数値空欄を `0` に変換していた
- `対策:` `saveRecord()` 側でも `journey_steps` の入力検証を必ず通し、数値項目は検証通過後にのみ `Number()` 化するよう修正した
- `再発防止:` 入力検証はフォーム送信前と保存処理本体の両方で実施する。管理画面には `Admin build` を表示し、キャッシュ反映も先に確認する
- `ユーザー確認結果:` 2026-03-21 時点で、`導線順序`、`表示名`、`遷移先URL`、`補足文言` の各チェックは正常動作し、正常値の保存も成功、`Admin build: 20260321e` と Console エラーなしを確認した
- `状態:` 解消済み

### Issue 2026-03-21-11
- `発生日:` 2026-03-21
- `発生箇所:` [`js/admin-app.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/admin-app.js), 管理画面の保存後通知
- `症状:` 保存成功通知が一瞬表示されるが、データ再取得後にすぐ消えていた
- `原因:` `loadPageData()` の先頭で常に `clearNotice()` を呼んでおり、保存成功後の再取得でも通知が消えていた
- `対策:` `loadPageData({ preserveNotice: true })` を導入し、保存直後の再取得では通知を保持するようにした
- `再発防止:` 再取得系処理では、通知を消す責務を無条件で持たせず、呼び出し元の意図で制御する
- `ユーザー確認結果:` 2026-03-21 時点で、通知が一瞬で消える現象を確認し、その後修正を実施した
- `状態:` 解消済み

### Issue 2026-03-22-12
- `発生日:` 2026-03-22
- `発生箇所:` [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html)
- `症状:` Workshop 予約 Draft で、空き状況記号に不要な枠線が付き、選択した日付がどこに反映されたか分かりにくかった。あわせて `/favicon.ico` の `404` が出た
- `原因:` 記号表示に共通の枠線付きスタイルを使っていたこと、選択中日付を下段パネルだけに依存していたこと、新規 HTML に favicon 指定が入っていなかったこと
- `対策:` 記号は `○ / □ / △ / × / -` のみを表示するスタイルへ修正し、カレンダー直下に選択中日付バーを追加した。`workshop-booking.html` と `workshop.html` に `rel=\"icon\"` を追加した
- `再発防止:` 予約カレンダーの記号は装飾ではなく意味記号として扱い、クリック結果はカレンダー付近にも明示する。新規 HTML 追加時は favicon を必ず含める
- `ユーザー確認結果:` 2026-03-22 時点で、カレンダー記号と選択日表示の改善要望、および Console の `404` を確認した
- `状態:` 解消済み

### Issue 2026-03-22-13
- `発生日:` 2026-03-22
- `発生箇所:` [`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html), [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html)
- `症状:` `確認 Draft を表示する` が入力未完了でも押せる。`参加人数` の縦位置が `電話番号` と揃っていない。`file://` 直開き環境で、クエリ付き相対遷移時にブラウザ警告が出るケースがある。
- `原因:` submit の disabled 制御を未実装だった。2列グリッドの縦揃え指定が不足していた。遷移 URL を文字列連結で作っていたため、`file://` 直開き環境で扱いが不安定だった。
- `対策:` submit は `form.checkValidity()` とポリシー同意が揃うまで disabled に変更し、グリッドは `align-items: start` と `align-content: start` を追加した。遷移 URL は `new URL()` と `searchParams` で組み立てる方式へ変更した。
- `再発防止:` 公開側フォーム Draft は、入力活性条件、縦揃え、`file://` 直開き時の遷移も含めて確認する。
- `ユーザー確認結果:` 2026-03-22 時点で、予約入力 Draft は良好、確認ボタン活性条件は良好、参加人数の縦位置は良好、Console エラーなしを確認した。
- `状態:` 解消済み

### Issue 2026-03-22-14
- `発生日:` 2026-03-22
- `発生箇所:` [`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html), [`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html)
- `症状:` 確認画面から `入力内容を修正する` で STEP 2 に戻ると、入力済みの代表者情報と人数が保持されていなかった。
- `原因:` 確認画面側では入力値をクエリへ保持していたが、STEP 2 側でその値をフォームへ再注入していなかった。
- `対策:` STEP 2 読み込み時に `contact_name`, `contact_email`, `contact_phone`, `party_size`, `special_requests` をクエリからフォームへ復元する処理を追加した。
- `再発防止:` 戻る導線を持つ Draft 画面は、遷移先 URL だけでなく、復元側のフォーム初期化まで実装して確認する。
- `状態:` 解消済み

### Issue 2026-03-23-15
- `発生日:` 2026-03-23
- `発生箇所:` [`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html)
- `症状:` `Booking build: 20260322b` で予約送信すると、`店舗マスタで「浅草店」が見つかりません。` で保存失敗した。
- `原因:` `store_id` 解決を `ilike("%浅草%")` の単純一致にしていたため、実DBの `stores.store_name` 表記ゆれ（英語名、接頭辞付き、表記差）を吸収できなかった。
- `対策:` `stores` を一覧取得して、`store/storeLabel` と店舗キー別ヒント（`asakusa/shibamata/solamachi`）で正規化マッチする方式へ変更した。`deleted_at/is_active` がある場合は有効店舗を優先し、候補1件時はフォールバック採用する。
- `再発防止:` 参照マスタのキー解決は単純文字列一致を避け、表記ゆれ吸収ルールと候補表示付きエラーを実装する。
- `ユーザー確認結果:` 2026-03-23 時点で、`Booking build: 20260322b` で予約送信成功、予約ID表示あり、Console エラーなしを確認済み。
- `状態:` 解消済み

### Issue 2026-03-23-16
- `発生日:` 2026-03-23
- `発生箇所:` [`js/site-shell.js`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/site-shell.js), [`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html)
- `症状:` 予約送信成功後に Console で `Multiple GoTrueClient instances detected in the same browser context` 警告が表示された。
- `原因:` `site-shell.js` と確認画面側の inline script がそれぞれ `supabase.createClient()` を実行し、同一ページで複数クライアントが生成されていた。
- `対策:` `window.__INIM_SUPABASE_CLIENT` を単一インスタンス格納先として導入し、両方のコードから同一クライアントを再利用するよう修正した。
- `再発防止:` Supabase クライアント生成は常に singleton 経由で行い、ページ内で直接 `createClient()` を重複実行しない。
- `ユーザー確認結果:` 2026-03-23 時点で、`Booking build: 20260322b` で予約送信成功、予約ID表示あり、Console エラーなし（警告なし）を確認済み。
- `状態:` 解消済み


### Issue 2026-03-25-17
- `発生日:` 2026-03-25
- `発生箇所:` [`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html), [`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html)
- `症状:` 日本語テキストが文字化けし、見出し・本文・HTMLタグの一部が崩れて画面表示が破綻した。
- `原因:` 文字コード非固定の一括置換により、UTF-8テキストが誤ったエンコーディングで再保存された。
- `対策:` 対象2ファイルを `HEAD` の正常UTF-8版へ復元し、必要差分（確認画面の必須値再検証、`internal_note` ラベル修正）のみ再適用した。
- `再発防止:` 日本語を含むHTML編集では UTF-8 を明示し、保存前後で文字化けパターン（`繝/譛ｪ/蜈･蜉` 等）とタグ破損（`/h1>` 等）を必ず grep 確認する。
- `ユーザー確認結果:` 2026-03-28 時点で再確認完了（OK）。
- `状態:` 解消済み（ユーザー確認済み）
## 3. 今後の運用ルール / Operational Rules
- 新しい Issue が発生したら、このファイルに必ず追記する
- 追記時は、同じ作業内で `docs/10_PROJECT/PROJECT_STATUS.md` と `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md` も更新する
- 管理画面に関する Issue の場合は、必要に応じて `docs/10_PROJECT/WIP.md` と `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md` も更新する
### Issue 2026-03-26-18
- `発生日:` 2026-03-26
- `発生箇所:` [`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html)
- `症状:` 送信時に `Auth session missing!` と表示され、予約送信に失敗した（Console エラーなし / Supabase LED 緑）。
- `原因:` 予約送信時の認証確認が `getUser()` 依存で、未ログイン時エラーメッセージがそのまま表示され、ログイン不足として扱いきれていなかった。
- `対策:` 認証確認を `supabase.auth.getSession()` ベースへ変更し、セッション未検出時は「ログインが必要」の明示メッセージとログイン導線を表示するよう修正した。
- `再発防止:` 予約送信前の認証チェックは `getSession()` を標準とし、`Auth session missing` 系メッセージは必ずログイン導線へ正規化する。
- `ユーザー確認結果:` 2026-03-28 時点で再確認完了（OK）。
- `状態:` 解消済み（ユーザー確認済み）
### Issue 2026-03-26-19
- `発生日:` 2026-03-26
- `発生箇所:` [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html)
- `症状:` Supabase 接続LEDが緑でも、カレンダーが常に 2026-04-05 のみ表示され、実データが見えない。
- `原因:` `workshop_sessions` 取得件数が 0 の場合に、UI がモック（4/5固定）へフォールバックする実装だったため、空データ/権限不足/RLS の切り分けが困難だった。
- `対策:` 0件時のモックフォールバックを廃止し、空状態メッセージを表示するよう修正。LEDタイトルに「date range / RLS / seed data確認」を明示。あわせてセッション取得範囲を当月初日〜12か月先へ拡大。
- `再発防止:` 公開予約画面は「接続成功」と「データ取得成功」を分離表示し、空データをモックで隠さない。
- `ユーザー確認結果:` 2026-03-28 時点で再確認完了（OK）。
- `状態:` 解消済み（ユーザー確認済み）


### Issue 2026-03-26-20
- `発生日:` 2026-03-26
- `発生箇所:` [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html), Supabase `workshop_plans` / `workshop_sessions`
- `症状:` Diagnostics で `Plans=0`, `Sessions=0`（`Stores=3`, `Error=-`）となり、予約カレンダーが空状態になる。
- `原因:` 公開予約ページが参照する seed データ未投入、または read policy 未整備で対象行が見えていない。
- `対策:` `sql/09_seed_workshop_booking_master_and_sessions.sql` を追加し idempotent seed を標準化。あわせて `sql/10_workshop_public_read_policies.sql` と `sql/11_verify_workshop_public_data.sql` を追加。
- `再発防止:` 新環境では `05 -> 07 -> 09 -> 11` を初期投入手順に固定し、`Plans/Sessions` が 0 の場合は `10 -> 11` で policy を確認する。
- `ユーザー確認結果:` 2026-03-28 時点で SQL 実行完了および表示確認完了（OK）。
- `状態:` 解消済み（ユーザー確認済み）

### Issue 2026-03-26-21
- `発生日:` 2026-03-26
- `発生箇所:` [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html)
- `症状:` Diagnostics で `Sessions > 0` でも、カレンダー上に予約可能日が表示されなかった。
- `原因:` `workshop_sessions.store_id` 参照に対し、store lookup が slug key ベースだったため、`store_id` で店舗情報を引けず、全セルが実質 `closed` 扱いになっていた。
- `対策:` store key 正規化関数を追加し、`store_id` 起点の map（`buildStoreByIdMap`）で `buildSchedule()` を構築するよう修正。
- `再発防止:` `id` 参照が必要な処理では slug map を直接流用せず、`id->entity` map を明示的に生成する。
- `状態:` 解消済み（2026-03-27 確認反映）

### Issue 2026-03-26-22
- `発生日:` 2026-03-26
- `発生箇所:` Admin運用（予約ステータス確認）
- `症状:` Supabase を直接見ないと予約ステータスの全件管理ができなかった。
- `原因:` 管理画面に予約専用の一覧/更新UIが未実装だった。
- `対策:` `app/pages/workshop.html` にフル予約管理UI（検索、絞り込み、詳細表示、status/internal_note更新）を実装。
- `再発防止:` 予約運用で必要な最低操作（一覧、検索、更新）は管理画面側で先行実装し、DB直参照依存を残さない。
- `状態:` 解消済み（2026-03-27 確認反映）

### Issue 2026-03-26-23
- 発生日: 2026-03-26
- 発生箇所: [subpages/workshop-booking.html](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html)
- 症状: 日本語テキストの文字化け（mojibake）と壊れたHTML断片が混在し、表示品質と保守性が低下。
- 原因: 過去編集時のエンコーディング不整合により、ファイル全体へ文字化けが波及。
- 対策: subpages/workshop-booking.html を UTF-8 で再構築し、文字化け文字列・壊れたタグを除去。必要なID/動線（Diagnostics、Summary、Calendar、Slots）を維持。
- 再発防止: 文字化けが出たファイルは部分修正ではなくUTF-8再構成を優先し、編集後に mojibake パターン（縺,繝,�）をスキャンする。
- 状態: 解消済み（2026-03-27 確認反映）

### Issue 2026-03-27-24
- Date: 2026-03-27
- Area: `app/pages/enquiries.html`, `js/admin-enquiries-page.js`, `app/pages/workshop.html`, `js/admin-workshop-page.js`
- Symptom: `Update Enquiry` and quick-status actions appear to change, then revert.
- Root cause: In `adminAccessMode: open_demo` anonymous session, update/write is blocked by backend policy.
- Action: Kept anonymous open_demo as read-only by design. Confirmed that logged-in update persists (`予約を更新` works).
- Status: Closed (by design + logged-in persistence verified)

### Issue 2026-03-27-25
- Date: 2026-03-27
- Area: `js/admin-workshop-plans-page.js`, `app/pages/workshop-plans.html`, `css/app-workshop-plans.css`
- Symptom: Lower sidebar area not visible, not scrollable, and white overlay appears on admin pages.
- Action: Applied desktop sidebar layout/scroll fix and cache-busted assets to `20260327c`.
- Verification target: Sidebar items 05-08 are visible and reachable after hard refresh.
- User confirmation (2026-03-27): "`20260327c works fine`".
- Status: Fixed (user verified)




### Issue 2026-03-27-26
- Date: 2026-03-27
- Area: `js/admin-enquiries-page.js`, `js/admin-workshop-page.js`
- Symptom: In anonymous `open_demo` mode, update actions looked available and could be misunderstood as writable operations.
- Root cause: Anonymous sessions are intentionally read-only by backend policy, but UX feedback was not explicit enough.
- Action: Added explicit read-only UX. `Update` and quick-status buttons are disabled for anonymous session, with fixed message: `Demo mode is read-only. Login required to save.`
- Status: Fixed (user verified)

### Issue 2026-03-28-30
- `発生日:` 2026-03-28
- `発生箇所:` [`subpages/about.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/about.html), [`css/style.css`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/css/style.css)
- `症状:` Aboutページで左テキスト列と右画像カード列の上端が揃わず、視覚的に段差が残った。
- `原因:` 見出しブロックを2カラムレイアウト外に置いていたため、テキスト開始位置とカード開始位置の認知基準がズレた。余白調整のみでは差分が解消しにくかった。
- `対策:` Aboutページを構造修正し、見出し・リード・本文を左カラム内へ統合。右カードと同一グリッド行の先頭に配置して上端を揃えた。
- `再発防止:` 2カラムレイアウトの上端整列要件は、margin調整より先にDOM構造（同一行開始）で満たす。
- `ユーザー確認結果:` 2026-03-28 時点で確認完了（OK to close）。
- `状態:` 解消済み（ユーザー確認済み）

### Issue 2026-03-27-27
- Date: 2026-03-27
- Area: `js/admin-workshop-plans-page.js`, `app/pages/workshop-plans.html`, `css/app-workshop-plans.css`
- Symptom: In anonymous open_demo mode, page 05 still showed actionable controls and style/label mismatch remained vs 04/06.
- Action: Unified page 05 button labels/style with 04/06 and enforced read-only disable for save/delete/add controls in anonymous session.
- Status: Fixed (user verified)

- 2026-03-27 follow-up (Issue 2026-03-27-27): non-login demo guest on page 05 now forced read-only with explicit disabled visuals. Status: Fixed (user verified).
- 2026-03-27 follow-up: step5 text/style consistency pass applied on 04/05/06 (Japanese labels + read-only disabled visibility).
- 2026-03-27 fix: update-revert issue mitigation extended to 04/06 by strict session-origin based read-only guard (same rule as 05).

### Issue 2026-03-28-28
- `発生日:` 2026-03-28
- `発生箇所:` [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html), [`css/workshop-booking.css`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/css/workshop-booking.css)
- `症状:` `選択中プラン` バーで `プランを変更する` ボタンを右寄せ調整後も、見た目上右端に揃わない。
- `原因(推定):` 右側アクション群内で `全プランを表示` が右端に配置され、`button--ghost` の低コントラストにより見えづらく、`プランを変更する` が中央寄りに見える。
- `対策:` アクション並びを `全プランを表示` -> `プランを変更する` の順へ変更し、`プランを変更する` を常に右端へ配置。
- `再発防止:` 右寄せ要件は「アクション群右寄せ」だけでなく「対象ボタンを右端に置くDOM順」まで仕様化して確認する。
- `ユーザー確認結果:` 2026-03-28 時点で「動作確認済み（confirmed）」を取得。
- `状態:` 解消済み（ユーザー確認済み）

### Issue 2026-03-28-29
- `発生日:` 2026-03-28
- `発生箇所:` [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html), [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html), [`sql/09_seed_workshop_booking_master_and_sessions.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/09_seed_workshop_booking_master_and_sessions.sql)
- `症状:` `workshop.html` の PROGRAM パネルから遷移すると booking 側の `選択プラン` が未表示（`workshop-plans.html` 経由では表示される）。
- `原因:` PROGRAM パネルが静的実装だったため、カード識別子と `workshop_plans.plan_code` の一致保証がなく、booking 側の plan 解決と乖離した。
- `対策:` PROGRAM を DB連動化し、`workshop_plans`（`status=active`, `sort_order asc`, `limit 3`）からカードを生成するよう変更。CTA には `data-plan-code/name` を付与し、`syncBookingLinks()` で `planCode/planName` と `store/storeLabel` を同時引継ぎ。
- `再発防止:` 予約導線で plan 文脈を渡す画面は、表示文言ではなく `plan_code` を正本キーとして単一運用する。
- `ユーザー確認結果:` 2026-03-28 時点で「it works」を確認。
- `状態:` 解消済み（ユーザー確認済み）

