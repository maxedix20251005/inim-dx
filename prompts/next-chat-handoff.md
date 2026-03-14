# inim-dx handoff prompt

このリポジトリは `c:\Users\maxsh\OneDrive\Documents\EDIX\src\inim-dx` です。  
既存のデザイン方針と共通 shell を壊さずに、次の作業を継続してください。

## 2026-03-14 の確認結果
- この handoff は旧状態から更新されておらず、少なくとも次が実体と不一致だった
  - リポジトリパス
  - `account` 機能の Supabase 接続有無
  - mock のみかどうか
  - 退会フローの実装状況
- 本ファイルは、実コード確認後の最新状態へ更新済み
- 同日追加修正: account 系
  - `subpages/account.html#preferences` でも `preferences` モーダルへ着地できるよう修正
  - `logout` / `delete` 実行後、`subpages/account.html` などの modal landing page で着地が不安定だったため、未ログイン時の landing を優先するよう修正
  - `delete` モードで確認用パスワード未入力時の field validation を追加
  - `profile` / `preferences` 保存後、`account` に戻った時点で成功メッセージが見えるよう修正
  - `favorite_store` の fallback を sample 値から `未設定` へ変更し、実データ有無の判定を曖昧にしないよう修正
  - recovery link (`type=recovery`) からの着地で `password` モーダルを開き、現在のパスワードなしで更新できるよう修正
  - `deleted_at` / `status=inactive` ユーザーはセッションを維持せず、ログイン画面へ戻して案内文を出すよう修正
  - 理由: A-4, A-6 のテスト観点に対して、深い画面遷移とログアウト後挙動が不安定だったため
  - 理由追記: B-4 の再設定メール導線と、soft delete 後ユーザーの扱いが未完成だったため
  - 影響: account 系モーダルの深いリンク、保存後メッセージ、退会後挙動、ログアウト後挙動、recovery link からの更新導線が安定する
- 同日追加修正: ブランド rename 系
  - `brand-propolis` から `brand-old-aroma` への rename 残件を整理
  - `pageKey` / title / sidebar label / 再生成スクリプト / 補助ファイルの旧名称を `brandOldAroma` / `旧アロマシリーズ` に統一
  - 理由: rename 後も `brandPropolis` と `日プロポリース` が一部に残っており、表示崩れと将来の再生成時の逆戻りリスクがあったため
  - 影響: 旧アロマシリーズページの title / current 判定 / ナビ表示 / 補助スクリプトが rename 後の名称で統一された
- 同日追加修正: トップページ UI
  - サイドナビの drilldown を default open から default close へ変更
  - current page が属するグループだけ open する挙動へ整理
  - 理由: トップページでナビが開いた状態だと初期視認性が落ち、UAT 中の確認ノイズになるため
  - 影響: home では sidebar group が閉じた状態で表示され、カテゴリ配下ページでは該当 group のみ開く
- 同日追加整理: account / workshop 移行
  - `wip/test-steps-account.md` を `test/test-account-result.md` へ移動・rename
  - workshop 次フェーズ用に `wip/test-workshop.md` を新規作成
  - 理由: account は一旦区切りとし、以降は workshop の現状整理と改良検討へ移るため
  - 影響: account の確認ログは `test` 配下で保持し、次の作業起点は workshop 文書へ移る
- 同日追加修正: workshop LP 再構成
  - 旧 `subpages/workshop.html` を `subpages/ex-workshop.html` へ退避
  - 新 `subpages/workshop.html` は `references/design/01-proposal.html` と `references/design/06-design-guide.html` を基準に再設計
  - Hero を体験価値訴求型へ変更し、中間 CTA、プログラム比較、FAQ、予約前判断材料を追加
  - 画像は `images/Workshop/*` の既存素材のみを使用し、加工は行っていない
  - 理由: 現行ページは情報ブロックは揃っていたが、提案書が重視する「導線設計」と「体験価値の伝達」が弱く、予約転換力が不足していたため
  - 影響: workshop ページは「魅力理解 → 比較 → 不安解消 → 予約」の流れが明確になり、旧版との差分確認も `ex-workshop.html` で可能
- 同日追加修正: workshop LP の流れ強化
  - 情報カード中心の見せ方から、写真とテキストの交互レイアウトへ調整
  - `Flow` セクションを矢印付きの `STEP 1 -> STEP 2 -> STEP 3` 導線に変更
  - 中間 CTA を帯状セクション化し、プラン比較への流れを強調
  - 理由: 前版は整理されて見やすい一方で、ボックスの連続により硬い印象があり、LPとしてのリズムと視線誘導がまだ弱かったため
  - 影響: workshop ページの読み進め方がより直感的になり、参考LPに近い「流れる導線」の印象が強くなる
- 同日追加調整: program カードの強調方法
  - `Signature Blend` を縦位置の段差で強調するのをやめ、3カードの上端を揃えた
  - 左右カードは写真と本文の上下順を反転し、中央カードとの差を「崩れ」ではなく「構成上の意図」として見せる形に変更
  - 理由: 段差による強調が、意図した演出よりも HTML/CSS 崩れに見える懸念があったため
  - 影響: プログラム比較は整列感を保ちつつ、中央カードを基準に左右へ変化を付ける見せ方になった
- 同日追加調整: Signature Blend 冒頭配置
  - 中央カードも左右カードと同様に、ラベル・タイトル・概説文をカード上部へ配置
  - 画像はその下へ移動し、メタ情報と CTA は画像後に続く構成へ変更
  - 理由: 3カードで最初に読む情報の位置を揃え、比較時の視線移動を安定させるため
  - 影響: program 比較の冒頭が3カードで共通化され、中央カードだけ構造が崩れて見えるリスクが減る
- 同日追加調整: 両端 program カードの画像下揃え
  - `Trial` と `Gift` の画像がカード最下部で揃うよう、画像前の本文領域を伸縮させる構成へ変更
  - 理由: 左右カードで画像位置が微妙にずれて見えると、比較時の整列感が弱くなるため
  - 影響: program セクションは本文量に差があっても、左右の画像位置を安定して揃えられる
- 同日追加調整: クリッカブル要素の hover 統一
  - workshop ページ内のアンカーナビも hover / focus-visible 時に浮き上がる挙動を追加
  - 理由: ボタン類とナビピルで hover の反応差があると、クリック可能要素としての一貫性が弱く見えるため
  - 影響: workshop ページでは主要なクリック可能要素が同系統の hover 反応を持つ
- 同日追加調整: 店舗選択マップ
  - `Location` セクション内に店舗選択チップと Google Map iframe を追加
  - default は浅草店、切替先は `東武浅草駅` `帝釈天` `スカイツリー` を query にした埋め込み地図
  - 理由: 店舗案内エリアに空白があり、来店先イメージと予約判断材料をその場で補える余地があったため
  - 影響: workshop ページ内で店舗選択と地図確認が完結し、予約前の店舗比較がしやすくなる
- 同日追加調整: 地図選択と店舗カードの連動
  - 右側の店舗選択チップに応じて、左側の該当店舗カードを浮き上がらせて強調する状態同期を追加
  - 理由: 地図だけ切り替わると左右の情報が分断されやすく、現在どの店舗を見ているかが一目で伝わりにくいため
  - 影響: `Location` セクション内で選択中の店舗が左右両方で同期表示され、視線誘導が明確になる
- 同日追加調整: 柴又店の地図クエリ補正
  - 柴又店の Google Map query を `帝釈天` から `葛飾区柴又 帝釈天` へ変更
  - 理由: `帝釈天` 単独では表示範囲が広く、意図した location に寄りきらなかったため
  - 影響: 柴又店選択時の地図は、柴又周辺により寄った表示になる
- 同日追加調整: hero 内の横幅バランス統一
  - 上段 CTA、`FOR / TIME / STORE / FLOW` の4要素、下段アンカーナビの横幅基準を揃えた
  - 上段 CTA は3分割、下段アンカーナビは5分割の均等幅に変更
  - 理由: hero 内で各ブロックの両端位置が揃っていないと、視覚的なまとまりが弱く見えるため
  - 影響: workshop hero の上中下ブロックが同じ横幅感で並び、バランスが安定する
- 同日追加調整: hero 画像の全面化
  - hero 右側の独立画像をやめ、`Workshop_ (4).png` を hero 背景全体へ展開
  - 左側はテキスト可読性のため、左に行くほど不透明になる段階的な透過オーバーレイを追加
  - 理由: 右側だけの画像では存在感が弱く、途中で切れて見えやすかったため
  - 影響: hero は画像が左端まで続く見え方になりつつ、左側テキストの視認性も維持される
- 同日追加調整: Value セクションのビジュアル刷新
  - `Value` セクション全体に `Lineup image_ (6).png` を背景表示し、独立した右側画像は廃止
  - テキストブロックは右側へ移し、左から右へ濃くなるグラデーションで可読性を確保
  - 理由: 単独写真ではなくセクション全体を面で見せたい、という意図に合わせるため
  - 影響: Value セクションは背景一体型の演出になり、テキストは右寄せレイアウトで読ませる構成になる
- 同日追加調整: workshop 見出しサイズのトークン整理
  - hero の `h1` を大見出しトークンとして明示し、`Value` 以降の `h2` は別トークンとしてサイズ・行間・字間を整理
  - `Workshop` / `Value` などの section kicker もサイズを引き上げ、視認性を補強
  - hero / Value の見出しは `、` 位置で改行し、視線の収まりを調整
  - 理由: 見出し差が実装依存に見えていたため、Design Guide の階層に寄せて意図的な差へ整理する必要があったため
  - 影響: hero は主役として大きく、各セクション見出しは一段下げて統一され、kicker も補助要素として読みやすくなる
- 同日追加調整: Value 背景の透過開始位置
  - `Value` セクション背景の透過は、左から約20%以降で立ち上がるよう再調整
  - 理由: 33% 付近からの透過でも可読域が足りず、右側テキストがなお読みにくかったため
  - 影響: 背景画像の見せ方よりも本文可読性を優先した、より早いフェード構成になる
- 同日追加調整: Value テキストエリアの右寄せ
  - `Value` セクションのグリッド比率を変更し、テキストブロックをさらに右端寄りへ配置
  - 理由: 背景グラデーションだけでは可読性調整に限界があり、本文自体を明るい領域へ寄せた方が確実だったため
  - 影響: Value セクションは画像の見せ場を左に残しつつ、テキストは右側でより安定して読める配置になる
- 同日追加修正: Scene セクションの背景化
  - `Scene` も `Value` 同様に背景一体型セクションへ変更し、テキストは左側へ配置
  - 背景画像は `images/others/others_ (8).png` を左右反転した `images/others/others_ (8-1).png` を新規作成して使用
  - 背景は右から約30%領域で透過が進むグラデーションを重ねている
  - 理由: `Scene` も単独写真より面で見せた方が LP 全体の統一感と情緒訴求が強く、ボトル位置も右側へ寄せたかったため
  - 影響: Scene セクションは左テキスト / 右ボトルの構図になり、Value と対になる背景演出として見せられる
- 同日追加調整: Scene 背景のボトル収まり
  - `others_ (8-1).png` は `right center / auto 100%` に変更し、上下が切れない高さ基準の表示へ調整
  - 理由: 拡大率ベースの表示ではボトルの下だけでなく上部も切れていたため
  - 影響: Scene セクションではオリジナル画像の上下が収まり、ボトル全体が見えやすくなる
- 同日追加調整: Scene 背景の透過カーブ
  - `Scene` は右側画像を疑似要素 `::before` に分離し、そのレイヤー自体を右側 72% 領域に限定したうえで左端を mask-image でフェードさせる方式へ変更
  - 理由: 全幅レイヤーのままでは、透過率を調整しても画像実端が縦線として見えやすかったため
  - 影響: Scene セクションは写真レイヤーの開始位置がテキスト側と直接ぶつからず、境目の硬さが弱まる
- 同日追加調整: Flow 矢印のコネクタ化
  - `Flow` のカードは `display:flex` 化して高さを揃え、meta チップはカード下端へ揃うよう変更
  - 矢印は自作線をやめ、`images/arrow/arrow05_rolling.png` をカード間中央に配置する形へ差し替え
  - カード間 gap も矢印画像が自然に収まる幅へ再調整
  - 理由: 自作矢印は不格好で、カードサイズの不揃いも相まって全体の整列感を崩していたため
  - 影響: `Flow` セクションはカードの高さが揃い、矢印も素材ベースで安定した見え方になる
- 同日追加調整: Flow 矢印サイズ拡大
  - `arrow05_rolling.png` の表示サイズと配置オフセットを拡大し、カード間でより目立つよう調整
  - 理由: 初回適用サイズでは導線として少し弱く、カード間のアクセントとして埋もれやすかったため
  - 影響: `STEP 1 -> STEP 2 -> STEP 3` の視線誘導が強まり、フローのつながりが認識しやすくなる
- 同日追加調整: workshop-store-note の地図可変化
  - `workshop-store-note` を縦 flex レイアウトに変更し、`workshop-map-frame` が残り高さを吸収する構成へ変更
  - `iframe` は固定 `height: 320px` から `height: 100%` + `min-height: 320px` に変更
  - 理由: テキスト量を減らした際に、右パネル下部へ空白が残っていたため
  - 影響: 店舗案内右パネルは本文量に応じて地図が縦に伸縮し、余白が出にくくなる
- 同日追加修正: placeholder / Under Construction CSS 復旧
  - `site-shell.js` が出力する `placeholder-page` 系クラスに対応するスタイルを `css/style.css` へ追加
  - `Under Construction` サイン、コーン、ツール、見出し、本文まで一式のプレースホルダー表示を復旧
  - 理由: 未作成ページではマークアップは出ていたが、対応 CSS が無いため素のテキスト表示になっていたため
  - 影響: `brand-groundbreakers.html` を含む未作成ページで、意図した Under Construction 表示が戻る
- 同日追加調整: placeholder コーン配色
  - `Under Construction` 両サイドのコーン配色を赤系から黄黒ストライプへ変更
  - 理由: 工事中モチーフとしては黄黒の方が視認性と意味の伝わりやすさが高いため
  - 影響: 未作成ページの placeholder は、より一般的な工事中表現に近い見た目になる
- 同日追加調整: reservation CTA の右寄せ
  - `workshop-reserve__actions` に `justify-content: flex-end` を追加し、CTA 群を右寄せ表示に変更
  - 理由: Reservation セクションでは本文と CTA を左右で役割分担させた方が収まりが良いため
  - 影響: workshop 最終 CTA はデスクトップで右寄せ表示になる
- 同日追加調整: top page journey 矢印
  - `index.html` の `journey__grid` 3カード間にも `images/arrow/arrow05_rolling.png` を追加
  - カード間 gap も矢印画像が収まる幅へ拡張し、サイズは workshop の flow 矢印と同じに統一、モバイルでは縦向きに回転配置
  - 理由: workshop LP の flow とトップページの体験導線を同じモチーフでつなげた方が一貫性が出るため
  - 影響: top page の「体験の流れ」も、カード間の導線が視覚的に認識しやすくなる
- 同日追加調整: top page hero-banner の背景化
  - `index.html` の `#hero-banner` は右側画像カラムをやめ、`Lineup image_ (6).png` をセクション全体の背景に適用
  - 左側テキストにかかる領域は背景 50% 付近まで透過グラデーションを重ね、テキスト幅は全体の 50% を超えないよう制限
  - 理由: hero-banner も画像を面で見せた方が訴求力が高く、テキストとのバランスも整えやすいため
  - 影響: top page の experience banner は workshop の Value と近い背景一体型の見せ方になる
- 同日追加調整: top page hero-banner CTA 幅統一
  - `#hero-banner .experience-banner__actions` を 1 カラム grid にし、2つのボタン幅を統一
  - 理由: CTA 幅が異なると、上下並び時のバランスが崩れて見えるため
  - 影響: hero-banner の CTA は同じ幅で揃って表示される
- account 関連で何か変更した場合は、理由と影響が第三者にも分かる形でこのファイルへ追記すること
- account 関連が一段落したら、このファイルを account handoff 用に rename して保管し、次フェーズ用の handoff を分離すること

## まず把握すること
- トップページは [index.html](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/index.html) を正とする
- Header / Left Side Navi / Footer / account modal は [js/site-shell.js](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/site-shell.js) で共通化済み
- 共通スタイルは [css/style.css](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/css/style.css)
- Smart Scent Design 固有のアプリ内部スタイルは [css/smart-scent-design-app.css](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/css/smart-scent-design-app.css)
- Supabase 接続設定は [js/site-config.js](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/site-config.js)
- Supabase 方針メモは [docs/supabase-customer-account.md](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/docs/supabase-customer-account.md)
- Supabase の初期スキーマは [supabase/customer-account-schema.sql](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/supabase/customer-account-schema.sql)
- account 実装の詳細メモは [prompts/account-auth-system-notes.md](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/prompts/account-auth-system-notes.md)
- account の結果メモは [test/test-account-result.md](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/test/test-account-result.md)
- workshop の現状メモは [wip/test-workshop.md](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/wip/test-workshop.md)

## 現在の構成
- `index.html` は実ページ
- `subpages/workshop.html` はワークショップ詳細の実ページ
- `subpages/ex-workshop.html` は workshop 旧版の退避ファイル
- `subpages/smart-scent-design.html` は既存アプリを保持した実ページ
- `subpages/*.html` の大半は `page-main` のみを持つ placeholder で、本文は `site-shell.js` 側の共通描画に依存
- `app/*.html` と `app/pages/*.html` も同じ共通 shell で成立する placeholder 管理画面
- `references/design/*` は参照資料
- `images/*` は素材置き場で、今回の構成確認では実装判断に必要な範囲のみ対象とする
- `tmp/*` と `wip/*` には作業途中の補助ファイルがある

## ここまでの主要改善点
- `site-shell.js` で全ページの共通 shell を管理
  - Header
  - Left Side Navi
  - Footer
  - Global Navigation
  - floating global nav
  - hamburger / mobile sidebar
  - account modal
- sitemap ベースの placeholder ページ群を作成済み
- Top page の Hero から
  - `体験する` -> `subpages/smart-scent-design.html`
  - `香りと遊ぶ！香游` -> `subpages/workshop.html`
- [subpages/workshop.html](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) は 05-wireframe を意識した詳細ページ
- [subpages/smart-scent-design.html](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/smart-scent-design.html) は既存デジタル調香アプリを温存しつつ shell 統合済み
- account UI は [css/style.css](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/css/style.css) に追加済み

## account の実装状況
- Supabase は未接続ではない
  - `js/site-config.js` に `supabaseUrl`, `supabasePublishableKey`, `authRedirectUrl` がある
  - 各ページで `@supabase/supabase-js@2` CDN を読み込む構成
- `site-shell.js` で次を実装済み
  - `signInWithPassword`
  - `signUp`
  - `resetPasswordForEmail`
  - `getSession`
  - `onAuthStateChange`
  - `profiles` 読取 / 更新
  - `customer_preferences` 読取 / upsert
  - `updateUser({ password })`
  - `signOut`
  - 退会時の `profiles.deleted_at` / `status='inactive'` 更新
- ログイン状態に応じて Header / Sidebar / Footer の導線切替も実装済み
  - 未ログイン: `ログイン / 会員登録`
  - ログイン済み: `マイアカウント / ログアウト`
- `subpages/login.html`, `subpages/register.html`, `subpages/account.html` へ直接アクセスしても共通モーダルが開く
- モーダル内データは完全 mock ではない
  - セッション、`profiles`, `customer_preferences` が取得できれば実データを表示
  - 未取得時のみ fallback 用の sample 値を使う

## 現状の重要前提
- 実装は進んでいるが、ブラウザでの最終実機確認は未完了
- `email rate limit exceeded` が発生するため、会員登録メール系テストは制限を受ける
- `profiles` / `customer_preferences` の前提は SQL が Supabase 側へ適用済みであること
- `profile` 画面で `profiles.email` は更新するが、`auth.users.email` との完全同期は未整理
- 退会は soft delete 前提で、`deleted_at` と `status='inactive'` を更新してログアウトする設計
- `site-shell.js` は現時点では日本語をそのまま持つ箇所が多く、`\\u` エスケープ主体ではない
- 共通 shell や共通 CSS の変更は全ページ影響が大きいので、差分影響を慎重に確認すること

## 次に優先すべき作業
1. 新 `subpages/workshop.html` の実表示確認を行う
   - Hero / Program / FAQ / Reservation の読み順、スマホ表示、CTA の見え方を確認する
2. 必要に応じて `Smart Scent Design` との接続導線をさらに強化する
3. workshop 文言の実データ化や価格情報の確定が必要なら詰める
4. account の結果は [test/test-account-result.md](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/test/test-account-result.md) に保管し、追加修正が出たときだけ参照する

## 実装時の注意
- 共通 shell の仕様が変わる場合は [js/site-shell.js](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/js/site-shell.js) を正として一括で直すこと
- 手動編集は `apply_patch` を使うこと
- 既存の unrelated な変更は戻さないこと
- Smart Scent Design のアプリ本体ロジックは壊さないこと
- Header / Side Navi / Footer の見た目は [index.html](/c:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/index.html) を正とすること
- 05-wireframe / 06-design-guide の意図を崩す大変更は避けること
- 大きくレイアウトが変わる場合は、修正前に確認を入れること
- account 関連変更時は、この handoff に「変更理由」と「影響範囲」を残すこと

## 直近の確認対象
- A-1 既存ユーザーのログイン
- A-2 プロファイル表示
- A-3 プロファイル編集
- A-4 好みの設定
- A-5 パスワード変更
- A-6 退会手続き

## 補足
- `references/design/*` は実装根拠として残っている
- `tools/generate-placeholder-pages.ps1` は旧 placeholder 生成用で、現在の各ページは `site-config.js` と Supabase CDN 読み込みを含む
- `wip/testing-ws-1.html` は workshop 方向性の旧試作で、本番ページではない
