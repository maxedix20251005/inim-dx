## ISSUE LIST: inim-dx

### このドキュメントの目的
- このファイルは、`inim-dx` で発生した不具合、実装上の問題、運用上の詰まりを継続管理するための常設 Issue 一覧です。
- Issue は、発生日、発生箇所、症状、原因、対策、再発防止策が第三者に伝わる粒度で記録します。
- 今後も、`docs/PROJECT_STATUS.md` と `docs/AI_CONTEXT_PROMPT.md` とあわせて必ず最新化します。
- 更新後は、日本語の文字化けがないか必ず確認します。

### 記載ルール
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
- `状態:` 継続監視

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

### 今後の運用ルール
- 新しい Issue が発生したら、このファイルに必ず追記する
- 追記時は、同じ作業内で `docs/PROJECT_STATUS.md` と `docs/AI_CONTEXT_PROMPT.md` も更新する
- 管理画面に関する Issue の場合は、必要に応じて `docs/WIP.md` と `docs/admin-implementation-status.md` も更新する
