# Account Test Result

最終更新: 2026-03-14

## 目的

この文書は、inim-dx の顧客アカウント機能について、UAT で確認した項目と残確認項目を整理するための結果メモです。

現時点では会員登録メール送信に `email rate limit exceeded` があるため、確認済み項目と rate limit 解消後に再開すべき項目を同じ文書で管理します。

## 前提条件

- GitHub Pages の最新コードが反映済みであること
- `Site URL` と `Redirect URLs` が Supabase 側で設定済みであること
- `supabase/customer-account-schema.sql` が Supabase `SQL Editor` で適用済みであること
- テスト対象サイト: `https://maxedix20251005.github.io/inim-dx/`

## 事前確認

1. GitHub Pages 上の `js/site-config.js` が最新であることを確認する
2. Supabase `Authentication > URL Configuration` の設定を確認する
3. Supabase `Table Editor` で `profiles` と `customer_preferences` が存在することを確認する
4. ブラウザは `Ctrl + F5` でハードリロードしてから開始する

## A. 今すぐ検証できる項目

### A-1. 既存ユーザーのログイン

1. サイトを開く
2. `ログイン` を開く
3. 既存のテストユーザーでログインする
4. 次を確認する
- `マイアカウント` モーダルへ遷移する
- Header / Sidebar / Footer がログイン済み表示へ切り替わる
- `subpages/account.html` に直接アクセスした場合も `account` モーダルが開く

### A-2. プロファイル表示

1. `マイアカウント` を開く
2. 次を確認する
- `profiles` にデータがある場合、氏名・表示名・メールアドレスが実データで表示される
- `favorite_store` があれば表示される
- `deleted_at` が無い通常ユーザーで表示崩れがない

### A-3. プロファイル編集

1. `プロファイル編集` を開く
2. `お名前` または `表示名` を変更する
3. `保存` を押す
4. 次を確認する
- 成功メッセージ後に `マイアカウント` に戻る
- 画面表示が更新される
- Supabase `profiles` テーブルの値が更新される

### A-4. 好みの設定

1. `マイアカウント` から `好みの設定` を開く
2. 次のいずれかを入力する
- `好みの香調`
- `希望する体験`
- `メモ`
3. `保存` を押す
4. 次を確認する
- `customer_preferences` に upsert される
- `マイアカウント` summary に反映される
- 空データ時は従来の fallback 表示が維持される

### A-5. パスワード変更

1. `パスワード変更` を開く
2. わざと誤った `現在のパスワード` を入れて送信する
3. エラーになることを確認する
4. 正しい `現在のパスワード` と新しいパスワードを入力する
5. 次を確認する
- 再認証が通る
- 新しいパスワードへ更新される
- 次回ログイン時に新しいパスワードが使える

### A-6. 退会手続き

1. `退会手続き` を開く
2. わざと誤った `確認用パスワード` を入れて送信する
3. エラーになることを確認する
4. 正しい `確認用パスワード` を入力する
5. 次を確認する
- `profiles.deleted_at` が入る
- `profiles.status = inactive` になる
- ログアウト状態へ戻る
- Header / Sidebar / Footer が未ログイン表示へ戻る

## B. rate limit 解消後に再開する項目

### B-1. 新規会員登録

1. 未使用メールアドレスを用意する
2. `新規会員登録` を開く
3. 必須項目を入力して送信する
4. 次を確認する
- エラーなく送信される
- 確認メール送信メッセージが表示される
- Supabase `Authentication > Users` にユーザーが作成される

### B-2. 確認メールのリンク先

1. 受信した確認メールを開く
2. リンク先を確認する
3. 次を確認する
- `redirect_to=https://maxedix20251005.github.io/inim-dx/subpages/account.html` になっている
- クリック後 `subpages/account.html` 側へ戻る
- ログイン済みなら `マイアカウント` モーダルが開く

### B-3. profiles 自動作成

1. B-1 の会員登録を成功させる
2. Supabase `profiles` テーブルを確認する
3. 次を確認する
- `auth.users.id` と同じ `id` で `profiles` 行が自動作成される
- `full_name`, `display_name`, `email` の初期値が入る

### B-4. パスワード再設定メール

1. `パスワード再設定` を開く
2. 登録済み email を入れて送信する
3. 受信メールを開く
4. 次を確認する
- メールが届く
- リンク先の `redirect_to` が期待どおり
- そこから `password` モーダルへ着地し、現在のパスワードなしで新しいパスワード設定へ進める

## C. 確認ログの残し方

各検証後に、最低限次を記録すること。

- 実施日時
- テストした URL
- 使用したユーザー
- 期待値
- 実際の結果
- エラーメッセージ原文
- Supabase 側で確認したテーブル / 行

## D. 既知の注意点

- `email rate limit exceeded` はコード不具合ではなく Supabase Auth の送信制限
- 同じ email に対して `signUp()` を繰り返すと確認メール再送の挙動が分かりにくくなる
- GitHub Pages 反映待ち中は古い JS / redirect を見てしまうことがある
- `profiles.email` は更新できるが、`auth.users.email` との完全同期はまだ未実装
- `deleted_at` / `status = inactive` のユーザーは login へ戻す実装だが、案内文の最終調整は未了

## E. 未検証または追加で詰めるべき点

- `preferences` モードに strict validation を入れるか
- 退会後ユーザーの再ログインをどう扱うか
- `deleted_at` 済みユーザーを UI でどう案内するか
- `auth.users.email` 変更方針
- confirmation email の再送導線
