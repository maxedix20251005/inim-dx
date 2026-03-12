# inim-dx handoff prompt

このリポジトリは `c:\academia\src\inim-dx` です。  
あなたは既存のデザイン方針と共通 shell を壊さずに、次の作業を継続してください。

## まず把握すること
- トップページは [index.html](/c:/academia/src/inim-dx/index.html) を正とする
- Header / Left Side Navi / Footer は [site-shell.js](/c:/academia/src/inim-dx/js/site-shell.js) で共通化済み
- 共通スタイルは [style.css](/c:/academia/src/inim-dx/css/style.css)
- Smart Scent Design 固有のアプリ内部スタイルは [smart-scent-design-app.css](/c:/academia/src/inim-dx/css/smart-scent-design-app.css)
- 顧客向けアカウント管理は Supabase 前提で進める
- Supabase 方針メモは [supabase-customer-account.md](/c:/academia/src/inim-dx/docs/supabase-customer-account.md)
- Supabase の初期スキーマは [customer-account-schema.sql](/c:/academia/src/inim-dx/supabase/customer-account-schema.sql)

## ここまでの主要改善点
- `site-shell.js` で全ページの共通 shell を管理
  - Header
  - Left Side Navi
  - Footer
  - Global Navigation
  - floating global nav
  - hamburger / mobile sidebar
- sitemap ベースの placeholder ページ群を作成済み
- `ブランド > 旧アロマシリーズ` の表記は共通 shell 側で修正済み
- Top page の Hero から
  - `体験する` -> `subpages/smart-scent-design.html`
  - `香りと遊ぶ！香游` -> `subpages/workshop.html`
- [workshop.html](/c:/academia/src/inim-dx/subpages/workshop.html) は 05-wireframe ベースで作成済み
- [smart-scent-design.html](/c:/academia/src/inim-dx/subpages/smart-scent-design.html) は既存アプリを温存しつつデザイン整理済み
- 顧客向けアカウントモーダルを `site-shell.js` に仮実装済み
  - login
  - register
  - forgot password
  - my account
  - edit profile
  - change password
  - delete account
- アカウントモーダル用 UI は [style.css](/c:/academia/src/inim-dx/css/style.css) に追加済み

## 現状の重要前提
- アカウント機能はまだ Supabase 未接続
- 現在のモーダル内データは mock
- 直接
  - `subpages/login.html`
  - `subpages/register.html`
  - `subpages/account.html`
  にアクセスしても共通モーダルが開く構成
- `site-shell.js` は文字化け回避のため日本語ラベルの多くを `\\u` エスケープで管理している
- 既存ページの見た目に影響しやすいので、共通 shell や共通 CSS の編集時は差分影響を慎重に確認すること

## 次に優先すべき作業
1. Supabase クライアント導入方針を決める
   - CDN で入れるか
   - どこに URL / anon key を持たせるか
2. 顧客アカウントモーダルを Supabase と接続する
   - signUp
   - signInWithPassword
   - resetPasswordForEmail
   - session 取得
   - profiles 取得 / 更新
3. ログイン状態に応じて Header / Side Navi / Footer の導線を切り替える
   - 未ログイン: `ログイン / 会員登録`
   - ログイン済み: `マイアカウント / ログアウト`
4. 退会フローを soft delete 前提で具体化する
5. その後、個別ページの中身を順次作る

## 実装時の注意
- 共通 shell の仕様が変わる場合は [site-shell.js](/c:/academia/src/inim-dx/js/site-shell.js) を正として一括で直すこと
- 手動編集は `apply_patch` を使うこと
- 既存の unrelated な変更は戻さないこと
- Smart Scent Design のアプリ本体ロジックは壊さないこと
- Header / Side Navi / Footer の見た目は `index.html` を正とすること
- 05-wireframe / 06-design-guide の意図を崩す大変更は避けること
- 大きくレイアウトが変わる場合は、修正前に確認を入れること

## 最初の着手提案
- まず [site-shell.js](/c:/academia/src/inim-dx/js/site-shell.js), [style.css](/c:/academia/src/inim-dx/css/style.css), [supabase-customer-account.md](/c:/academia/src/inim-dx/docs/supabase-customer-account.md), [customer-account-schema.sql](/c:/academia/src/inim-dx/supabase/customer-account-schema.sql) を読んでから作業開始
- その上で Supabase 接続の最小実装に進む

## 補足
- ブラウザでの最終実機確認は未実施の箇所がある
- 現時点では UI の土台と DB 設計を先に固めている段階
