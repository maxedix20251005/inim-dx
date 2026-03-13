# inim-dx Account / Auth System Notes

最終更新: 2026-03-13

## この文書の目的

この文書は、`inim-dx` サイトの会員登録、ログイン、パスワード再設定、マイアカウント導線、および Supabase 連携の現状を、第三者がそのまま引き継げるレベルで整理したものです。

今後この領域に変更が入った場合は、この文書も必ず更新することを前提とします。

この文書は次の用途を兼ねます。

- このプロジェクトの継続開発用 handoff
- 類似の静的サイト + Supabase Auth 構成を設計する際の prompt / reference
- 実装済み範囲、未実装範囲、運用上の注意点の明文化

## 前提

- リポジトリルート: `c:\academia\src\inim-dx`
- サイトは静的 HTML ベース
- 共通 UI shell は JavaScript で注入している
- 会員機能は `Supabase Auth` を利用
- 会員詳細は `public.profiles` テーブルを前提にしている
- 管理者が Supabase ダッシュボードへログインするためのアカウントと、inim-dx サイト会員は完全に別物

## 参照すべき設計資料

アカウント管理まわりを今後変更する際は、必ず次を確認すること。

- `references/design/01-proposal.html`
- `references/design/04-sitemap.html`
- `references/design/05-wireframe.html`
- `references/design/06-design-guide.html`
- `references/design/worksheet-inim-dx.pdf`

特にフォームのエラー表示、導線の見せ方、ボタンの優先度は `06-design-guide.html` の UI コンポーネント方針に合わせる。

## 関連ファイル

### 実装本体

- `js/site-shell.js`
- `css/style.css`
- `js/site-config.js`

### Supabase 設計

- `docs/supabase-customer-account.md`
- `supabase/customer-account-schema.sql`

### 補助ドキュメント

- `references/settings/checkclist-supabase.md`
- `prompts/next-chat-handoff.md`
- `prompts/account-auth-system-notes.md` ← この文書

## 現在の実装方針

### UI 構成

- Header / Left Side Navi / Footer / アカウントモーダルは `js/site-shell.js` で共通注入する
- アカウント系ページ
  - `subpages/login.html`
  - `subpages/register.html`
  - `subpages/account.html`
  は個別ページを持つが、実体は共通モーダルで表示する
- モーダルスタイルは `css/style.css` に集約する

### 会員システムの責務分離

- `Supabase Auth`
  - サイト会員の認証情報を持つ
  - email / password / auth user id を管理する
- `public.profiles`
  - 会員詳細を持つ
  - 氏名、表示名、状態、よく利用する店舗などを持つ
- Supabase ダッシュボードの管理者ログイン情報
  - サイト会員とは無関係
  - フロント実装で使わない

## 現在の Supabase 接続設定

現在の設定ファイル:

- `js/site-config.js`

現時点の内容:

```js
window.INIM_SITE_CONFIG = {
    supabaseUrl: 'https://viybkwnwzlizmssxevlm.supabase.co',
    supabasePublishableKey: 'sb_publishable_ROCyYciMQhG6cH9EI3SkiQ_BDfQgLm8',
    authRedirectUrl: 'https://maxedix20251005.github.io/inim-dx/subpages/account.html'
};
```

### 重要な注意

- `supabasePublishableKey` は公開可能なキー
- `service_role key` は絶対にフロントへ置かない
- 安全性はキー秘匿より RLS / policy 設計に依存する

## GitHub Pages / Supabase Auth URL 設定

公開 URL:

- `https://maxedix20251005.github.io/inim-dx/`

Supabase 側で設定済みの前提:

- `Authentication > URL Configuration > Site URL`
  - `https://maxedix20251005.github.io/inim-dx/`
- `Authentication > URL Configuration > Redirect URLs`
  - `https://maxedix20251005.github.io/inim-dx/subpages/account.html`
  - `https://maxedix20251005.github.io/inim-dx/subpages/login.html`

### 重要な注意

- 確認メール / パスワード再設定メールのリンク先は、メール送信時点の設定とコードに依存する
- GitHub Pages が未反映の状態で送ったメールは、古い `redirect_to` を持つ可能性がある
- GitHub Pages は通常 1〜3 分程度で反映されるが、5〜10 分程度かかることもある

## Supabase DB スキーマ前提

`supabase/customer-account-schema.sql` により、以下が定義されている。

### `public.profiles`

- `id uuid primary key references auth.users(id)`
- `full_name text not null`
- `display_name text`
- `email text not null`
- `status text not null default 'active'`
- `favorite_store text`
- `newsletter_opt_in boolean not null default false`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

### `public.customer_preferences`

- `profile_id uuid primary key references public.profiles(id)`
- `preferred_scent_family text`
- `preferred_experience text`
- `notes text`
- `created_at timestamptz`
- `updated_at timestamptz`

### RLS / Policy

`profiles`, `customer_preferences` ともに RLS 有効化済み前提。

主な policy:

- `profiles_select_own`
- `profiles_insert_own`
- `profiles_update_own`
- `preferences_select_own`
- `preferences_insert_own`
- `preferences_update_own`

意味:

- ログインした本人だけが自分のデータを読める
- 本人だけが自分のデータを insert / update できる

## 現在までに実装済みの機能

## 1. 共通モーダル基盤

`js/site-shell.js` と `css/style.css` にて以下を復旧 / 実装済み。

- アカウントモーダル DOM 生成
- backdrop close
- close button
- `Escape` キーで閉じる
- `data-account-modal` クリックで開く
- `data-account-switch` でモーダル内画面切替
- `#login` などのハッシュとモーダル表示の連動
- `subpages/login.html`, `subpages/register.html`, `subpages/account.html` の共通モーダル表示

## 2. UI 調整

以下を設計資料に合わせて調整済み。

- モーダルの overlay / dialog / close button / spacing
- `login` モーダルは原則スクロールなしになるよう余白調整
- `register` / `profile` は軽いスクロールを許容する方針
- `Forgot password` / `新規会員登録` 等の補助導線をリンク表現へ変更
- visited 表現が効くよう、一部導線を `button` ではなく `a` 要素へ変更
- `Save` と `Back / Cancel` を色分離
- `Back / Cancel` は Top Page と統一感のある neutral / ghost 系へ調整
- 用語を `プロフィール` ではなく `プロファイル` に統一

## 3. フィールド単位バリデーション

対象:

- `login`
- `register`
- `forgot`

実装済み内容:

- `blur` 時のフィールド単位 validation
- 入力欄直下へのエラーメッセージ表示
- `is-error` スタイル
- submit 時の全項目再検証
- 最初のエラー項目への自動フォーカス
- 文言は日本語へ統一

## 4. Supabase Auth 連携

### login

使用 API:

- `supabase.auth.signInWithPassword(...)`

実装状況:

- 実装済み
- 成功時は `account` ビューへ遷移
- 失敗時はモーダル内メッセージ表示

### register

使用 API:

- `supabase.auth.signUp(...)`

実装状況:

- 実装済み
- 最低限の入力検証あり
- `emailRedirectTo` を `authRedirectUrl` から指定
- `data.session` が返る場合は account view へ
- email confirmation 必須時は確認メール送信メッセージを表示

### forgot password

使用 API:

- `supabase.auth.resetPasswordForEmail(...)`

実装状況:

- 実装済み
- `redirectTo` を `authRedirectUrl` から指定
- 成功 / 失敗メッセージ表示あり

### logout

使用 API:

- `supabase.auth.signOut()`

実装状況:

- 実装済み

## 5. セッション反映

使用 API:

- `supabase.auth.getSession()`
- `supabase.auth.onAuthStateChange(...)`

実装済み内容:

- Header の account 導線切替
- Sidebar の account 導線切替
- Footer の account 導線切替
- 未ログイン時
  - `ログイン`
  - `会員登録`
- ログイン済み時
  - `マイアカウント`
  - `ログアウト`

## 6. 認証後の account 着地制御

`subpages/account.html` 到達時の挙動:

- ログイン済みなら `account` モーダル自動表示
- 未ログインなら `login` モーダル自動表示
- `profile` / `password` / `delete` の深い画面にも対応する土台あり

## 7. profiles 読取 / 保存

現時点で `profiles` の読取と `プロファイル編集` からの保存を実装済み。

使用クエリ:

```sql
select id, full_name, display_name, email, status, favorite_store, created_at, deleted_at
from profiles
where id = currentUser.id
```

実装仕様:

- ログイン済み時に `public.profiles` を読む
- 行がない場合は fallback 表示
- `deleted_at` が入っている場合は fallback 扱い
- `account` / `profile` 画面では `profiles` を優先表示
- `profile` モードでは `full_name`, `display_name`, `email` を update できる
- fallback は次の順
  - `currentProfile`
  - `auth.user.user_metadata`
  - `auth.user.email`
  - mock 値

## 8. profiles 自動作成

DB トリガー方式で進める前提。

SQL に追加済みの要素:

- `public.handle_new_auth_user()`
- `on_auth_user_created` trigger on `auth.users`

初期投入ルール:

- `id = new.id`
- `email = new.email`
- `full_name = coalesce(new.raw_user_meta_data->>'name', new.email, '未設定')`
- `display_name = nullif(new.raw_user_meta_data->>'display_name', '')`

補足:

- `on conflict (id) do nothing` で二重作成を避ける
- これは SQL を Supabase 側へ適用して初めて有効になる
- 既存の Auth ユーザーに対しては自動で backfill されない

### SQL 適用後に必要なこと

- Supabase `SQL Editor` で `supabase/customer-account-schema.sql` を実行する
- 既存ユーザー用に必要であれば backfill SQL を別途実行する

## まだ未実装の機能

以下は未実装、または stub のまま。

- `profiles` の保存更新
- `customer_preferences` の読取 / 保存
- `パスワード変更` の実処理
- `退会` の実処理
- soft delete 実装
- email confirmation 済み後の成功メッセージ導線の最終最適化
- 再送 confirmation email 導線

## 強く推奨する次の実装順

## 1. `profiles` 保存

`プロファイル編集` 画面から次を update:

- `full_name`
- `display_name`
- `email`

ただし email 更新は Auth 側との整合に注意すること。

## 2. 再送 confirmation email

同じ email に対する再送は `signUp()` ではなく以下を使うべき。

- `supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo } })`

理由:

- 既存ユーザー相手に `signUp()` を再実行しても、confirmation 再送としては不適切
- Supabase は存在隠蔽や rate limit の都合で期待通りの見え方をしないことがある

## 3. パスワード変更 / 退会

この 2 つは再認証や認証状態確認が絡むため、`profiles` 自動作成 / 保存より後でよい。

## 運用上の注意点

## 1. Supabase のメール送信 rate limit

短時間に何度も会員登録 / 再設定メールを送ると、次のようなエラーが出る。

- `email rate limit exceeded`

これはコード不具合ではなく、Supabase Auth の送信上限制御。

対処:

- 時間を空ける
- 送信テストを連打しない
- 同一メールでの連続再試行を避ける

## 2. 既存 email での再登録

確認メールが初回しか届かないように見える場合がある。

主因:

- 同一 email に対し `signUp()` を再度呼んでいる
- これは confirmation 再送の正式な方法ではない

## 3. GitHub Pages の反映待ち

デプロイ直後は古い JS が配信されるように見えることがある。

確認ポイント:

- GitHub Pages の反映完了
- `Ctrl + F5` での再読み込み
- 公開中の `js/site-config.js` の内容確認
- メールリンク内の `redirect_to` の確認

## 4. security

- `publishable key` は公開可
- `service_role key` は絶対に置かない
- RLS と policy が本体
- `profiles` / `customer_preferences` は本番公開前に RLS 実適用を再確認すること

## テスト時の確認項目

## 新規会員登録

- 入力 validation が field 単位で出る
- 送信後のメッセージが正しい
- `Authentication > Users` にユーザーが作成される
- 確認メールが届く
- リンククリック後に `subpages/account.html` へ戻る

## ログイン

- 正しい email / password でログインできる
- account モーダルへ遷移する
- Header / Sidebar / Footer がログイン済み表示に切り替わる

## パスワード再設定

- メール送信が通る
- 送信先 redirect が期待値どおり

## profiles 読取

- `profiles` に行があると account / profile 表示が実データになる
- 行がなくても UI が壊れない

## 変更時のルール

今後、会員登録・ログイン・プロフィール管理・Supabase 設定に変更が入った場合は、必ずこの文書も同時に更新すること。

最低限、以下を更新対象とする。

- 実装済み機能
- 未実装機能
- Supabase 設定
- redirect URL
- 関連ファイル
- 既知の運用上の注意
- 推奨する次の実装順

## 補足

このシステムは現時点で「静的サイト + 共通 shell + Supabase Auth」という構成であり、ビルドツールやサーバーサイドアプリを前提にしていない。

同様の構成を他案件で再利用する場合の基本原則は次の通り。

- 共通 account UI は 1 箇所に集約する
- 認証情報は Supabase Auth に持たせる
- 会員詳細は `profiles` に分離する
- `service_role` をフロントへ出さない
- redirect URL はコードと Supabase 設定の両方で明示する
- `profiles` 自動作成は DB トリガーを優先検討する
- field-level validation を先に整え、保存処理はその後に行う

