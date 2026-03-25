# Supabase Checklist for inim-dx

## このファイルの目的
- `inim-dx` サイトで Supabase を安全に使うための初心者向けチェックリストです。
- `site-config.js` に `Project URL` と `publishable key` を入れる前に確認する内容をまとめています。
- Supabase 管理画面でどこを見ればよいかも、このファイル内にまとめています。

## 最初に覚えておくこと
- `Project URL` は、どの Supabase プロジェクトに接続するかを示す URL です。
- `publishable key` は、ブラウザから接続するための公開用キーです。
- `anon key` と案内されることがありますが、現在は `publishable key` と理解して問題ありません。
- `service_role key` は管理者用の強いキーです。これをブラウザ側や `site-config.js` に置いてはいけません。
- 本当に重要なのは、キーそのものより `RLS` と `policy` の設定です。

## 結論
- `site-config.js` に `Project URL` と `publishable key` を書くこと自体は、通常の Supabase フロント実装では問題ありません。
- ただし、次の条件が満たされていることが前提です。
  - `service_role key` を使っていない
  - 対象テーブルで `RLS` が有効
  - `policy` が「本人だけアクセス可能」になっている

## 公開前チェックリスト

### 1. キーの扱い
- `site-config.js` に入れるのは `Project URL` と `publishable key` だけ
- `service_role key` は絶対に入れない
- キー名が分からないときは、Supabase 管理画面で `publishable` と表示されているものを使う

### 2. Authentication
- Supabase の `Authentication` が有効になっている
- メールアドレスでの `sign up` が使える
- `reset password` が使える
- メール確認を必須にするか決めている

### 3. Site URL と Redirect URLs
- `Site URL` が本番サイトの URL になっている
- ローカル確認用 URL を使うなら、それも登録している
- `reset password` や `email confirmation` 後に戻る `Redirect URLs` を登録している
- 間違った URL のままだと、ログイン後や再設定後の画面遷移が失敗する

### 4. Database
- `public.profiles` テーブルがある
- `public.customer_preferences` テーブルがある
- `profiles` の `id` が `auth.users.id` と結びついている
- `deleted_at` カラムがあり、退会を soft delete で扱える

### 5. RLS
- `profiles` で `RLS` が有効
- `customer_preferences` で `RLS` が有効
- ログインしていない人が他人のデータを見られない

### 6. Policy
- ログインした本人だけ、自分の `profiles` を読める
- ログインした本人だけ、自分の `profiles` を作成できる
- ログインした本人だけ、自分の `profiles` を更新できる
- `customer_preferences` も同じ考え方で制限されている

### 7. 退会処理
- 退会はすぐ削除ではなく `deleted_at` を入れる方針になっている
- 退会後に画面上でどう見せるか決めている
- 必要なら、あとで管理者側で完全削除する運用にする

### 8. 実装前に手元で用意するもの
- `Project URL`
- `publishable key`
- 本番サイト URL
- ローカル確認用 URL
- パスワード再設定後に戻したい URL

## このプロジェクトで見るべきSQL
- 現在の方針は [customer-account-schema.sql](/c:/academia/src/inim-dx/supabase/customer-account-schema.sql) にあります。
- ここには以下が含まれています。
  - `profiles` テーブル
  - `customer_preferences` テーブル
  - `updated_at` 自動更新 trigger
  - `RLS` の有効化
  - 本人だけが読める、作れる、更新できる policy

## Supabase 管理画面の確認手順

### 1. Project URL と key の確認
1. Supabase にログインする
2. 対象プロジェクトを開く
3. 左メニューから `Project Settings` を開く
4. `API` を開く
5. `Project URL` を確認する
6. `publishable key` を確認する
7. `service_role` と書かれたキーは使わない

確認ポイント:
- フロント側に入れるのは `Project URL` と `publishable key` のみ
- `service_role` をコピーしない

### 2. Authentication の確認
1. 左メニューから `Authentication` を開く
2. `Sign In / Providers` 関連の設定画面を開く
3. `Email` が有効になっているか確認する
4. `sign up` を許可する設定か確認する
5. メール確認を必須にするか確認する

確認ポイント:
- まずは `Email` の `sign in` が使えれば十分
- 初期段階では SNS ログインは不要

### 3. Site URL / Redirect URLs の確認
1. `Authentication` の設定画面を開く
2. `URL Configuration` を開く
3. `Site URL` に本番サイト URL が入っているか確認する
4. `Redirect URLs` に必要な URL が登録されているか確認する

登録しておく候補:
- 本番トップ URL
- ローカル確認 URL
- `reset password` 後に戻したい URL

確認ポイント:
- URL が違うと、メール内リンクから正しいページへ戻れない
- ローカル確認をするなら `localhost` 系のURLも追加する

### 4. テーブルの確認
1. 左メニューから `Table Editor` を開く
2. `profiles` テーブルがあるか確認する
3. `customer_preferences` テーブルがあるか確認する
4. カラム内容を確認する

`profiles` で見たい主なカラム:
- `id`
- `full_name`
- `display_name`
- `email`
- `status`
- `favorite_store`
- `newsletter_opt_in`
- `created_at`
- `updated_at`
- `deleted_at`

確認ポイント:
- `id` がユーザーごとに1つだけになること
- `deleted_at` があることで soft delete を実装しやすい

### 5. SQL が適用済みか確認
1. 左メニューから `SQL Editor` を開く
2. [customer-account-schema.sql](/c:/academia/src/inim-dx/supabase/customer-account-schema.sql) の内容を使って適用したか確認する
3. 未適用なら、内容を確認した上で実行する

確認ポイント:
- テーブルだけでなく `RLS` と `policy` まで入っているかが重要

### 6. RLS の確認
1. `Table Editor` で `profiles` を開く
2. `RLS` が有効か確認する
3. `customer_preferences` でも同じように確認する

確認ポイント:
- `RLS` がオフのままだと、想定外のアクセスを許しやすい
- Supabase ではここが最重要ポイントの1つ

### 7. Policy の確認
1. `profiles` テーブルの `Policies` 一覧を開く
2. select, insert, update の policy があるか確認する
3. `customer_preferences` でも同じように確認する

確認したい考え方:
- select: 本人だけ読める
- insert: 本人だけ自分の行を作れる
- update: 本人だけ自分の行を更新できる

このプロジェクトの例:
- `auth.uid() = id`
- `auth.uid() = profile_id`

### 8. Auth ユーザーと profiles の関係確認
1. `Authentication` の `Users` を開く
2. テスト用ユーザーを1件作る
3. `profiles` 側に対応する行が入る設計か確認する

確認ポイント:
- `auth.users` にユーザーがあっても、`profiles` が自動では入らない実装もある
- 今回はフロント実装側で `signUp` 後に `profiles` 行を作る想定

### 9. パスワード再設定の確認
1. `Authentication` の設定を確認する
2. `reset password` が有効に使えるか確認する
3. `Redirect URLs` が正しいか確認する

確認ポイント:
- メールは送れたが戻り先 URL が違って失敗することが多い
- 実装前に URL 設定を見直すだけでも事故が減る

## 初心者向けの理解まとめ
- `publishable key` は公開してよい
- でも何でもできるわけではない
- 実際に守ってくれるのは `RLS` と `policy`
- だから「キーが見えるか」より「DB設定が正しいか」が大事

## 絶対にやらないこと
- `service_role key` をブラウザ側に置く
- `RLS` をオフのまま公開する
- policy を確認せずに本番公開する
- URL 設定を空のまま `reset password` を実装する

## 実装開始前の最終確認
- `Project URL` を取得済み
- `publishable key` を取得済み
- `service_role key` は使っていない
- SQL が適用済み
- `RLS` が有効
- policy がある
- `Site URL` と `Redirect URLs` が設定済み

## 次にやること
- このチェックリストを見ながら Supabase 管理画面を確認する
- `Project URL` と `publishable key` を用意する
- その後、`site-config.js` と `site-shell.js` の接続実装に進む
