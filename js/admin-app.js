(() => {
    const body = document.body;
    const main = document.getElementById("page-main");
    if (!body || !main) return;

    const root = body.dataset.root || ".";
    const pageKey = body.dataset.pageKey || "appLogin";
    const cfg = window.INIM_SITE_CONFIG || {};
    const sbApi = window.supabase || null;
    const supabase = cfg.supabaseUrl && cfg.supabasePublishableKey && sbApi?.createClient
        ? sbApi.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey)
        : null;

    const pages = {
        appLogin: ["app/login.html", "ログイン", "role check / session start", "管理者または運用担当者向けの認証入口です。"],
        appDashboard: ["app/dashboard.html", "ダッシュボード", "hub / overview", "KPI、優先タスク、主要導線ショートカットを確認します。"],
        appPagesHome: ["app/pages/home.html", "トップ編集", "top_hero_items / preview", "ヒーロー文言、CTA、公開状態を更新します。"],
        appPagesJourney: ["app/pages/journey.html", "導線設定", "journey_steps / cta", "体験導線の表示順、リンク先、状態を管理します。"],
        appPagesWorkshop: ["app/pages/workshop.html", "Workshop Admin", "reserved", "この画面は次の実装対象として確保しています。"],
        appPublish: ["app/publish.html", "公開管理", "publish / checklist", "公開前のチェックと更新状況の確認を行います。"],
        appUsersMe: ["app/users/me.html", "アカウント設定", "session / profile", "現在の管理者セッションとロールを確認します。"],
        appPasswordForgot: ["app/password/forgot.html", "パスワード再設定", "forgot password", "再設定メールを送信します。"],
        appPasswordReset: ["app/password/reset.html", "新しいパスワード設定", "reset password", "再設定リンクから新しいパスワードを設定します。"]
    };
    const protectedPages = new Set(["appDashboard", "appPagesHome", "appPagesJourney", "appPagesWorkshop", "appPublish", "appUsersMe"]);
    const accessRules = {
        appPagesHome: ["admin", "editor"],
        appPagesJourney: ["admin", "editor"],
        appPagesWorkshop: ["admin", "editor"],
        appPublish: ["admin", "editor", "operator"]
    };
    const navItems = [
        ["appDashboard", "ダッシュボード", "01"],
        ["appPagesHome", "トップ編集", "02"],
        ["appPagesJourney", "導線設定", "03"],
        ["appPublish", "公開管理", "04"],
        ["appUsersMe", "アカウント設定", "05"]
    ];
    const state = {
        session: null,
        user: null,
        profile: null,
        roles: [],
        roleAssignments: [],
        notice: "",
        noticeType: "info",
        queryWarnings: [],
        metrics: { reservations: "--", heroItems: "--", inquiries: "--" },
        contentAssets: [],
        heroItems: [],
        journeySteps: [],
        selectedHeroId: "",
        selectedStepId: ""
    };

    const currentPage = pages[pageKey] || pages.appLogin;
    const escapeHtml = (v) => String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
    const toPath = (key) => `${root}/${pages[key][0]}`;
    const redirect = (key) => { window.location.href = toPath(key); };
    const isAllowedAdminUrl = (value) => /^(https?:\/\/|\/)/.test(value);
    const getAdminResetRedirectUrl = () => {
        if (typeof cfg.adminResetRedirectUrl === "string" && cfg.adminResetRedirectUrl.trim()) {
            return cfg.adminResetRedirectUrl.trim();
        }
        if (window.location.hostname === "maxedix20251005.github.io") {
            return "https://maxedix20251005.github.io/inim-dx/app/password/reset.html";
        }
        return new URL(toPath("appPasswordReset"), window.location.href).href;
    };
    const renderDebugRedirectNote = () => `
        <div class="admin-state admin-state--compact">
            <h2>再設定メールの送信先確認</h2>
            <div class="admin-key-value"><strong>現在のページ</strong><span>${escapeHtml(window.location.href)}</span></div>
            <div class="admin-key-value"><strong>設定ファイルの adminResetRedirectUrl</strong><span>${escapeHtml(cfg.adminResetRedirectUrl || "未設定")}</span></div>
            <div class="admin-key-value"><strong>実際に送信へ使う redirectTo</strong><span>${escapeHtml(getAdminResetRedirectUrl())}</span></div>
        </div>
    `;
    const normalizeRole = (v) => String(v || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    const roleLabel = (r) => ({ admin: "Admin", editor: "Editor", operator: "Operator" }[r] || r || "Unknown");
    const pretty = (k) => ({
        auth_user_id: "AuthユーザーID",
        display_name: "表示名",
        account_status: "利用状態",
        last_login_at: "最終ログイン日時",
        internal_note: "管理メモ",
        role_code: "ロールコード",
        role_name: "ロール名",
        title: "見出し",
        lead_text: "リード文",
        cta_label: "CTA文言",
        cta_url: "遷移先URL",
        asset_id: "画像アセットID",
        bucket_name: "バケット名",
        file_path: "ファイルパス",
        file_type: "ファイル種別",
        mime_type: "MIMEタイプ",
        alt_text: "代替テキスト",
        display_order: "表示順",
        is_active: "公開対象",
        step_no: "導線順序",
        step_name: "表示名",
        link_url: "遷移先URL",
        helper_text: "補足文言",
        is_visible: "表示可否",
        updated_by: "更新者",
        created_at: "作成日時",
        updated_at: "更新日時"
    }[k] || k);
    const fmtDate = (v) => {
        if (!v) return "未取得";
        const d = new Date(v);
        return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    };
    const getIdKey = (r) => ["id", "step_id", "item_id"].find((k) => r && r[k] !== undefined) || "id";
    const getOrder = (r) => {
        const k = ["display_order", "sort_order", "order_index", "position", "step_no", "step_number"].find((x) => r && r[x] !== undefined);
        return k ? Number(r[k]) || 0 : 0;
    };
    const getLabel = (r) => {
        const k = ["headline", "heading", "title", "name", "label", "step_name"].find((x) => r && r[x]);
        return k ? String(r[k]) : `${getIdKey(r)} ${r?.[getIdKey(r)] ?? ""}`.trim();
    };
    const heroFieldKeys = ["title", "lead_text", "cta_label", "cta_url", "asset_id", "display_order", "is_active"];
    const journeyFieldKeys = ["step_no", "step_name", "link_url", "helper_text", "is_visible"];
    const hasAllowedRole = () => {
        const allowed = accessRules[pageKey];
        return !allowed || state.roles.some((r) => allowed.includes(r));
    };
    const visibleNav = () => navItems.filter(([key]) => {
        const allowed = accessRules[key];
        return !allowed || state.roles.some((r) => allowed.includes(r));
    });
    const setNotice = (msg, type = "info") => {
        state.notice = msg;
        state.noticeType = type;
        render();
    };
    const clearNotice = () => {
        state.notice = "";
        state.noticeType = "info";
    };
    const statusHtml = () => state.notice ? `<div class="admin-status is-${escapeHtml(state.noticeType)}">${escapeHtml(state.notice)}</div>` : "";

    const renderSidebar = () => `
        <aside class="admin-sidebar">
            <div class="admin-brand">
                <span class="admin-brand__eyebrow">inim-dx</span>
                <strong class="admin-brand__title">Admin Portal</strong>
            </div>
            <div class="admin-sidebar__profile">
                <strong>${escapeHtml(state.profile?.display_name || state.profile?.full_name || state.user?.email || "未ログイン")}</strong>
                <span>${escapeHtml(state.user?.email || "セッション未確立")}</span>
                <ul class="admin-role-list">
                    ${(state.roles.length ? state.roles : ["unknown"]).map((r) => `<li class="admin-role-badge">${escapeHtml(roleLabel(r))}</li>`).join("")}
                </ul>
            </div>
            <nav class="admin-nav" aria-label="管理画面ナビゲーション">
                ${visibleNav().map(([key, label, no]) => `<a href="${escapeHtml(toPath(key))}" class="${key === pageKey ? "is-current" : ""}"><span class="admin-nav__number">${escapeHtml(no)}</span><span>${escapeHtml(label)}</span></a>`).join("")}
            </nav>
            <div class="admin-sidebar__footer">
                <a class="admin-link-button is-secondary" href="${escapeHtml(toPath("appUsersMe"))}">セッション確認</a>
                <button class="admin-logout" type="button" data-action="logout">ログアウト</button>
                <span class="admin-footer-note">公開サイト用の既存JS/CSSとは分離しています。</span>
            </div>
        </aside>
    `;
    const renderTopbar = () => `
        <div class="admin-topbar">
            <div class="admin-topbar__title-wrap">
                <p class="admin-topbar__eyebrow">${escapeHtml(currentPage[2])}</p>
                <h1>${escapeHtml(currentPage[1])}</h1>
                <p>${escapeHtml(currentPage[3])}</p>
            </div>
            <div class="admin-topbar__meta">
                <span>現在: ${escapeHtml(fmtDate(new Date().toISOString()))}</span>
                <span>権限: ${escapeHtml(state.roles.map(roleLabel).join(", ") || "未取得")}</span>
            </div>
        </div>
    `;
    const renderBooleanSelect = (name, value, trueLabel, falseLabel) => `
        <div class="admin-field">
            <label>${escapeHtml(pretty(name))}</label>
            <select name="${escapeHtml(name)}">
                <option value="true" ${value ? "selected" : ""}>${escapeHtml(trueLabel)}</option>
                <option value="false" ${!value ? "selected" : ""}>${escapeHtml(falseLabel)}</option>
            </select>
        </div>
    `;
    const renderAssetSelect = (selectedAssetId) => `
        <div class="admin-field">
            <label>${escapeHtml(pretty("asset_id"))}</label>
            <select name="asset_id">
                <option value="">未設定</option>
                ${state.contentAssets.map((asset) => {
            const summary = [asset.file_type, asset.file_path, asset.alt_text].filter(Boolean).join(" / ");
            return `<option value="${escapeHtml(asset.id)}" ${String(asset.id) === String(selectedAssetId || "") ? "selected" : ""}>${escapeHtml(summary || asset.id)}</option>`;
        }).join("")}
            </select>
        </div>
    `;
    const renderAssetSummary = (assetId) => {
        const asset = state.contentAssets.find((item) => String(item.id) === String(assetId || ""));
        if (!asset) {
            return `<div class="admin-empty">選択中のアセット情報はありません。</div>`;
        }
        return `
            <div class="admin-key-value"><strong>${escapeHtml(pretty("file_type"))}</strong><span>${escapeHtml(asset.file_type || "未設定")}</span></div>
            <div class="admin-key-value"><strong>${escapeHtml(pretty("file_path"))}</strong><span>${escapeHtml(asset.file_path || "未設定")}</span></div>
            <div class="admin-key-value"><strong>${escapeHtml(pretty("alt_text"))}</strong><span>${escapeHtml(asset.alt_text || "未設定")}</span></div>
            <div class="admin-key-value"><strong>${escapeHtml(pretty("bucket_name"))}</strong><span>${escapeHtml(asset.bucket_name || "未設定")}</span></div>
        `;
    };
    const renderHeroEditor = (record) => {
        if (!record) return `<div class="admin-empty">編集対象を選択してください。</div>`;
        return `
            <form class="admin-form" data-form="hero-save">
                <input type="hidden" name="record_id_value" value="${escapeHtml(record.id)}">
                <div class="admin-form-grid">
                    <div class="admin-field">
                        <label>${escapeHtml(pretty("title"))}</label>
                        <input name="title" maxlength="60" required value="${escapeHtml(record.title || "")}">
                    </div>
                    <div class="admin-field">
                        <label>${escapeHtml(pretty("cta_label"))}</label>
                        <input name="cta_label" maxlength="20" required value="${escapeHtml(record.cta_label || "")}">
                    </div>
                    <div class="admin-field is-full">
                        <label>${escapeHtml(pretty("lead_text"))}</label>
                        <textarea name="lead_text" maxlength="160" required>${escapeHtml(record.lead_text || "")}</textarea>
                    </div>
                    <div class="admin-field is-full">
                        <label>${escapeHtml(pretty("cta_url"))}</label>
                        <input name="cta_url" maxlength="255" required value="${escapeHtml(record.cta_url || "")}">
                    </div>
                    ${renderAssetSelect(record.asset_id)}
                    <div class="admin-field">
                        <label>${escapeHtml(pretty("display_order"))}</label>
                        <input name="display_order" inputmode="numeric" required value="${escapeHtml(record.display_order ?? 1)}">
                    </div>
                    ${renderBooleanSelect("is_active", Boolean(record.is_active), "公開", "非公開")}
                </div>
                <div class="admin-toolbar"><div class="admin-toolbar__group"><button class="admin-button" type="submit">保存</button></div></div>
            </form>
        `;
    };
    const renderJourneyEditor = (record) => {
        if (!record) return `<div class="admin-empty">編集対象を選択してください。</div>`;
        return `
            <form class="admin-form" data-form="journey-save">
                <input type="hidden" name="record_id_value" value="${escapeHtml(record.id)}">
                <div class="admin-form-grid">
                    <div class="admin-field">
                        <label>${escapeHtml(pretty("step_no"))}</label>
                        <input name="step_no" value="${escapeHtml(record.step_no ?? 1)}">
                    </div>
                    <div class="admin-field">
                        <label>${escapeHtml(pretty("step_name"))}</label>
                        <input name="step_name" value="${escapeHtml(record.step_name || "")}">
                    </div>
                    <div class="admin-field is-full">
                        <label>${escapeHtml(pretty("link_url"))}</label>
                        <input name="link_url" value="${escapeHtml(record.link_url || "")}">
                    </div>
                    <div class="admin-field is-full">
                        <label>${escapeHtml(pretty("helper_text"))}</label>
                        <textarea name="helper_text">${escapeHtml(record.helper_text || "")}</textarea>
                    </div>
                    ${renderBooleanSelect("is_visible", Boolean(record.is_visible), "表示", "非表示")}
                </div>
                <div class="admin-toolbar"><div class="admin-toolbar__group"><button class="admin-button" type="submit">保存</button></div></div>
            </form>
        `;
    };
    const renderLogin = () => `
        <div class="admin-page">
            <div class="admin-login-wrap">
                <section class="admin-login-card">
                    <div class="admin-login-card__side">
                        <div class="admin-brand"><span class="admin-brand__eyebrow">inim-dx</span><strong class="admin-brand__title">Admin Portal</strong></div>
                        <p>管理者・編集者・運用担当者の認証起点です。ログイン後にロールに応じたメニューだけを表示します。</p>
                        <ul class="admin-inline-list">
                            <li>ログイン後に user_profiles とロールを取得</li>
                            <li>top_hero_items と journey_steps を優先管理</li>
                            <li>公開サイト側とは描画系を分離</li>
                        </ul>
                    </div>
                    <div class="admin-login-card__body">
                        <div><p class="admin-topbar__eyebrow">${escapeHtml(currentPage[2])}</p><h1>${escapeHtml(currentPage[1])}</h1><p>${escapeHtml(currentPage[3])}</p></div>
                        ${statusHtml()}
                        <form class="admin-form" data-form="login">
                            <div class="admin-form-grid">
                                <div class="admin-field is-full"><label for="login-email">メールアドレス</label><input id="login-email" name="email" type="email" autocomplete="email" placeholder="admin@inim-dx.jp" required></div>
                                <div class="admin-field is-full"><label for="login-password">パスワード</label><input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="8文字以上" required></div>
                            </div>
                            <div class="admin-toolbar"><div class="admin-toolbar__group"><button class="admin-button" type="submit">ログイン</button><a class="admin-link-button is-secondary" href="${escapeHtml(toPath("appPasswordForgot"))}">パスワード再設定</a></div></div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    `;
    const renderDashboard = () => `
        <div class="admin-main">
            ${statusHtml()}
            <section class="admin-grid admin-grid--metrics">
                <article class="admin-metric"><strong>予約数</strong><span>${escapeHtml(String(state.metrics.reservations))}</span></article>
                <article class="admin-metric"><strong>トップ項目数</strong><span>${escapeHtml(String(state.metrics.heroItems))}</span></article>
                <article class="admin-metric"><strong>未対応問い合わせ</strong><span>${escapeHtml(String(state.metrics.inquiries))}</span></article>
            </section>
            <section class="admin-grid admin-grid--panels">
                <article class="admin-panel"><h2>本日の優先タスク</h2><ul class="admin-inline-list"><li>トップヒーローの訴求文言を確認</li><li>導線ステップのリンク先と表示順を点検</li><li>公開前チェックでロール差分を確認</li></ul></article>
                <article class="admin-panel"><h2>主要導線ショートカット</h2><ul class="admin-inline-list"><li><a href="${escapeHtml(toPath("appPagesHome"))}">トップ編集へ移動</a></li><li><a href="${escapeHtml(toPath("appPagesJourney"))}">導線設定へ移動</a></li><li><a href="${escapeHtml(toPath("appUsersMe"))}">現在のロールを確認</a></li></ul></article>
            </section>
            ${state.queryWarnings.length ? `<section class="admin-state"><h2>取得時の注意</h2><ul class="admin-inline-list">${state.queryWarnings.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul></section>` : ""}
        </div>
    `;
    const renderHome = () => {
        const selected = state.heroItems.find((x) => String(x[getIdKey(x)]) === String(state.selectedHeroId)) || null;
        const title = selected?.title || "プレビュー";
        const lead = selected?.lead_text || "選択中のレコード内容がここに表示されます。";
        const cta = selected?.cta_label || "CTA";
        return `<div class="admin-main">
            ${statusHtml()}
            <section class="admin-grid admin-grid--split">
                <article class="admin-table-shell">
                    <div class="admin-toolbar"><div class="admin-toolbar__group"><span class="admin-pill">top_hero_items</span><span class="admin-pill">${escapeHtml(`${state.heroItems.length}件`)}</span></div></div>
                    <table class="admin-table"><thead><tr><th>見出し</th><th>表示順</th><th>公開</th><th>操作</th></tr></thead><tbody>${state.heroItems.map((x) => `<tr><td>${escapeHtml(x.title || getLabel(x))}</td><td>${escapeHtml(String(x.display_order ?? "-"))}</td><td>${escapeHtml(x.is_active ? "公開" : "非公開")}</td><td><div class="admin-table__actions"><button type="button" data-action="select-hero" data-record-id="${escapeHtml(x[getIdKey(x)])}">編集</button></div></td></tr>`).join("")}</tbody></table>
                </article>
                <article class="admin-form-shell"><h2>トップ編集</h2><p>ヒーロー、訴求文言、CTA、公開状態を編集します。</p>${renderHeroEditor(selected)}</article>
            </section>
            <section class="admin-grid admin-grid--split">
                <article class="admin-panel"><h2>プレビュー</h2><div class="admin-preview"><div class="admin-preview__hero"></div><div class="admin-preview__copy"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(lead)}</p><span class="admin-preview__cta">${escapeHtml(cta)}</span></div></div></article>
                <article class="admin-panel"><h2>選択中アセット</h2>${renderAssetSummary(selected?.asset_id)}<ul class="admin-inline-list"><li>DB 設計書の top_hero_items カラムに合わせて編集項目を固定しています。</li><li>content_assets から画像アセットを選択できます。</li><li>公開サイト側の描画コードには触れていません。</li></ul></article>
            </section>
        </div>`;
    };
    const renderJourney = () => {
        const selected = state.journeySteps.find((x) => String(x[getIdKey(x)]) === String(state.selectedStepId)) || null;
        return `<div class="admin-main">
            ${statusHtml()}
            <section class="admin-grid admin-grid--split">
                <article class="admin-table-shell">
                    <div class="admin-toolbar"><div class="admin-toolbar__group"><span class="admin-pill">journey_steps</span><span class="admin-pill">${escapeHtml(`${state.journeySteps.length}件`)}</span></div></div>
                    <table class="admin-table"><thead><tr><th>順序</th><th>表示名</th><th>リンク先</th><th>表示</th><th>操作</th></tr></thead><tbody>${state.journeySteps.map((x) => `<tr><td>${escapeHtml(String(x.step_no ?? "-"))}</td><td>${escapeHtml(x.step_name || getLabel(x))}</td><td>${escapeHtml(String(x.link_url || "-"))}</td><td>${escapeHtml(x.is_visible ? "表示" : "非表示")}</td><td><div class="admin-table__actions"><button type="button" data-action="select-step" data-record-id="${escapeHtml(x[getIdKey(x)])}">編集</button></div></td></tr>`).join("")}</tbody></table>
                </article>
                <article class="admin-form-shell"><h2>導線設定</h2><p>体験導線の表示順、リンク先、状態を更新します。</p>${renderJourneyEditor(selected)}</article>
            </section>
            <section class="admin-panel"><h2>運用メモ</h2><p>DB 設計書の journey_steps 定義に合わせて step_no / step_name / link_url / helper_text / is_visible を更新します。</p></section>
        </div>`;
    };
    const renderPublish = () => `<div class="admin-main">${statusHtml()}<section class="admin-grid admin-grid--double"><article class="admin-panel"><h2>公開前チェック</h2><ul class="admin-inline-list"><li>トップ編集の保存結果を確認</li><li>導線設定のリンク先と表示順を確認</li><li>ログイン中ユーザーのロールを確認</li></ul></article><article class="admin-panel"><h2>現在の状態</h2><ul class="admin-inline-list"><li>トップ項目数: ${escapeHtml(String(state.heroItems.length))}</li><li>導線項目数: ${escapeHtml(String(state.journeySteps.length))}</li><li>最終更新者: ${escapeHtml(state.user?.email || "未取得")}</li></ul></article></section></div>`;
    const renderUsers = () => `<div class="admin-main">${statusHtml()}<section class="admin-grid admin-grid--double"><article class="admin-state"><h2>セッション</h2><div class="admin-key-value"><strong>ユーザーID</strong><span>${escapeHtml(state.user?.id || "未取得")}</span></div><div class="admin-key-value"><strong>メールアドレス</strong><span>${escapeHtml(state.user?.email || "未取得")}</span></div><div class="admin-key-value"><strong>最終サインイン</strong><span>${escapeHtml(fmtDate(state.user?.last_sign_in_at))}</span></div></article><article class="admin-state"><h2>プロフィール / ロール</h2><div class="admin-key-value"><strong>表示名</strong><span>${escapeHtml(state.profile?.display_name || "未取得")}</span></div><div class="admin-key-value"><strong>利用状態</strong><span>${escapeHtml(state.profile?.account_status || "未取得")}</span></div><div class="admin-key-value"><strong>ロール</strong><span>${escapeHtml(state.roles.map(roleLabel).join(", ") || "未取得")}</span></div></article></section>${state.profile ? `<section class="admin-state"><h2>取得済み user_profiles</h2>${Object.entries(state.profile).map(([k, v]) => `<div class="admin-key-value"><strong>${escapeHtml(pretty(k))}</strong><span>${escapeHtml(typeof v === "object" ? JSON.stringify(v) : String(v ?? ""))}</span></div>`).join("")}</section>` : ""}${state.roleAssignments.length ? `<section class="admin-state"><h2>取得済み user_role_assignments</h2>${state.roleAssignments.map((row, index) => `<div class="admin-key-value"><strong>行 ${escapeHtml(index + 1)}</strong><span>${escapeHtml(JSON.stringify(row))}</span></div>`).join("")}</section>` : ""}</div>`;
    const renderForgot = () => `<div class="admin-page"><div class="admin-login-wrap"><section class="admin-login-card"><div class="admin-login-card__side"><div class="admin-brand"><span class="admin-brand__eyebrow">inim-dx</span><strong class="admin-brand__title">Password Support</strong></div><p>管理画面ログインに使うメールアドレス宛に、再設定メールを送信します。</p></div><div class="admin-login-card__body"><div><p class="admin-topbar__eyebrow">${escapeHtml(currentPage[2])}</p><h1>${escapeHtml(currentPage[1])}</h1><p>${escapeHtml(currentPage[3])}</p></div>${statusHtml()}${renderDebugRedirectNote()}<form class="admin-form" data-form="forgot-password"><div class="admin-field is-full"><label for="forgot-email">メールアドレス</label><input id="forgot-email" name="email" type="email" autocomplete="email" placeholder="admin@inim-dx.jp" required></div><div class="admin-toolbar"><div class="admin-toolbar__group"><button class="admin-button" type="submit">再設定メールを送信</button><a class="admin-link-button is-secondary" href="${escapeHtml(toPath("appLogin"))}">ログインへ戻る</a></div></div></form></div></section></div></div>`;
    const renderReset = () => `<div class="admin-page"><div class="admin-login-wrap"><section class="admin-login-card"><div class="admin-login-card__side"><div class="admin-brand"><span class="admin-brand__eyebrow">inim-dx</span><strong class="admin-brand__title">Reset Password</strong></div><p>再設定リンクから遷移したあと、新しいパスワードに更新します。</p></div><div class="admin-login-card__body"><div><p class="admin-topbar__eyebrow">${escapeHtml(currentPage[2])}</p><h1>${escapeHtml(currentPage[1])}</h1><p>${escapeHtml(currentPage[3])}</p></div>${statusHtml()}<form class="admin-form" data-form="reset-password"><div class="admin-form-grid"><div class="admin-field is-full"><label for="reset-password">新しいパスワード</label><input id="reset-password" name="password" type="password" autocomplete="new-password" required></div><div class="admin-field is-full"><label for="reset-password-confirm">確認用パスワード</label><input id="reset-password-confirm" name="password_confirm" type="password" autocomplete="new-password" required></div></div><div class="admin-toolbar"><div class="admin-toolbar__group"><button class="admin-button" type="submit">新しいパスワードを保存</button><a class="admin-link-button is-secondary" href="${escapeHtml(toPath("appLogin"))}">ログインへ戻る</a></div></div></form></div></section></div></div>`;
    const renderProtected = () => {
        let content = "";
        if (!hasAllowedRole()) {
            content = `<div class="admin-main"><section class="admin-state"><h2>アクセス権限が不足しています</h2><p>この画面は ${escapeHtml((accessRules[pageKey] || []).map(roleLabel).join(", "))} 向けです。現在のロール: ${escapeHtml(state.roles.map(roleLabel).join(", ") || "未取得")}。</p><div class="admin-toolbar"><div class="admin-toolbar__group"><a class="admin-link-button is-secondary" href="${escapeHtml(toPath("appDashboard"))}">ダッシュボードへ戻る</a><button class="admin-button is-danger" type="button" data-action="logout">ログアウト</button></div></div></section></div>`;
        } else if (pageKey === "appDashboard") content = renderDashboard();
        else if (pageKey === "appPagesHome") content = renderHome();
        else if (pageKey === "appPagesJourney") content = renderJourney();
        else if (pageKey === "appPublish") content = renderPublish();
        else if (pageKey === "appUsersMe") content = renderUsers();
        else content = `<div class="admin-main"><section class="admin-state"><h2>確保済み画面</h2><p>このURLは将来の管理画面拡張用に残しています。現時点ではトップ編集と導線設定を優先実装しています。</p></section></div>`;
        return `<div class="admin-page"><div class="admin-layout">${renderSidebar()}<main class="admin-content">${renderTopbar()}${content}</main></div></div>`;
    };
    const render = () => {
        if (pageKey === "appLogin") main.innerHTML = renderLogin();
        else if (pageKey === "appPasswordForgot") main.innerHTML = renderForgot();
        else if (pageKey === "appPasswordReset") main.innerHTML = renderReset();
        else main.innerHTML = renderProtected();
        bindEvents();
    };
    const attemptQuery = async (label, fn) => {
        try {
            const res = await fn();
            if (res?.error) {
                state.queryWarnings.push(`${label}: ${res.error.message}`);
                return null;
            }
            return res.data ?? null;
        } catch (e) {
            state.queryWarnings.push(`${label}: ${e.message}`);
            return null;
        }
    };
    const extractRoles = (rows) => {
        const set = new Set();
        (rows || []).forEach((row) => {
            ["role", "role_name", "role_code", "role_slug"].forEach((k) => {
                const v = normalizeRole(row?.[k]);
                if (v) set.add(v);
            });
            if (row?.roles && typeof row.roles === "object") {
                ["name", "code", "slug"].forEach((k) => {
                    const v = normalizeRole(row.roles[k]);
                    if (v) set.add(v);
                });
            }
        });
        return [...set];
    };
    const sortRows = (rows) => [...(rows || [])].sort((a, b) => {
        const diff = getOrder(a) - getOrder(b);
        return diff !== 0 ? diff : getLabel(a).localeCompare(getLabel(b), "ja");
    });
    const loadProfile = async (userId) => {
        const candidates = [
            {
                label: "user_profiles.auth_user_id all columns",
                query: () => supabase
                    .from("user_profiles")
                    .select("*")
                    .eq("auth_user_id", userId)
                    .maybeSingle()
            },
            {
                label: "user_profiles.auth_user_id minimum",
                query: () => supabase
                    .from("user_profiles")
                    .select("id, auth_user_id, display_name")
                    .eq("auth_user_id", userId)
                    .maybeSingle()
            }
        ];
        for (const candidate of candidates) {
            try {
                const { data, error } = await candidate.query();
                if (!error) return data ?? null;
                state.queryWarnings.push(`${candidate.label}: ${error.message}`);
            } catch (e) {
                state.queryWarnings.push(`${candidate.label}: ${e.message}`);
            }
        }
        return null;
    };
    const loadRoles = async (_userId, profile) => {
        if (!profile?.id) return [];
        const rows = await attemptQuery("user_role_assignments.user_profile_id", () => supabase
            .from("user_role_assignments")
            .select("role_id, roles(role_code, role_name)")
            .eq("user_profile_id", profile.id));
        state.roleAssignments = rows || [];
        const directRoles = [...new Set((rows || []).map((row) => normalizeRole(row?.roles?.role_code)).filter(Boolean))];
        if (directRoles.length) return directRoles;
        const roleIds = [...new Set((rows || []).map((row) => row?.role_id).filter(Boolean))];
        if (!roleIds.length) return [];
        const roleRows = await attemptQuery("roles.id", () => supabase
            .from("roles")
            .select("id, role_code, role_name")
            .in("id", roleIds));
        return [...new Set((roleRows || []).map((row) => normalizeRole(row?.role_code)).filter(Boolean))];
    };
    const countRows = async (table, filterColumn, filterValue) => {
        try {
            let q = supabase.from(table).select("*", { count: "exact", head: true });
            if (filterColumn) q = q.eq(filterColumn, filterValue);
            const { count, error } = await q;
            if (error) {
                state.queryWarnings.push(`${table} count: ${error.message}`);
                return null;
            }
            return count;
        } catch (e) {
            state.queryWarnings.push(`${table} count: ${e.message}`);
            return null;
        }
    };
    const loadPageData = async () => {
        clearNotice();
        if (pageKey === "appPagesHome" || pageKey === "appPublish") {
            state.contentAssets = sortRows(await attemptQuery("content_assets", () => supabase
                .from("content_assets")
                .select("id, bucket_name, file_path, file_type, mime_type, alt_text, created_at, updated_at")
                .eq("file_type", "image")
                .is("deleted_at", null)) || []);
        }
        if (pageKey === "appDashboard") {
            const [rsv, hero, inq] = await Promise.all([countRows("reservations"), countRows("top_hero_items"), countRows("inquiries")]);
            state.metrics = { reservations: rsv ?? "--", heroItems: hero ?? "--", inquiries: inq ?? "--" };
        }
        if (pageKey === "appPagesHome" || pageKey === "appPublish") {
            state.heroItems = sortRows(await attemptQuery("top_hero_items", () => supabase
                .from("top_hero_items")
                .select("id, title, lead_text, cta_label, cta_url, asset_id, display_order, is_active, updated_by, created_at, updated_at")
                .is("deleted_at", null)) || []);
            state.selectedHeroId = state.heroItems[0]?.[getIdKey(state.heroItems[0])] || "";
        }
        if (pageKey === "appPagesJourney" || pageKey === "appPublish") {
            state.journeySteps = sortRows(await attemptQuery("journey_steps", () => supabase
                .from("journey_steps")
                .select("id, step_no, step_name, link_url, helper_text, is_visible, updated_by, created_at, updated_at")) || []);
            state.selectedStepId = state.journeySteps[0]?.[getIdKey(state.journeySteps[0])] || "";
        }
        render();
    };
    const saveRecord = async (table, rows, idValue, formData) => {
        const record = rows.find((x) => String(x[getIdKey(x)]) === String(idValue));
        if (!record) return setNotice("対象レコードが見つかりませんでした。", "error");
        const payload = {};
        const fields = table === "top_hero_items" ? heroFieldKeys : journeyFieldKeys;
        fields.forEach((k) => {
            const original = record[k];
            const next = formData.get(k);
            if (typeof original === "boolean") payload[k] = next === "true";
            else if (typeof original === "number") {
                const parsed = Number(next);
                payload[k] = Number.isFinite(parsed) ? parsed : original;
            } else payload[k] = next;
        });
        const { error } = await supabase.from(table).update(payload).eq(getIdKey(record), record[getIdKey(record)]);
        if (error) return setNotice(`保存に失敗しました: ${error.message}`, "error");
        setNotice(`${table} を更新しました。`, "success");
        await loadPageData();
    };
    const validateHeroForm = (form, rows, recordIdValue) => {
        const title = form.elements.title.value.trim();
        const leadText = form.elements.lead_text.value.trim();
        const ctaLabel = form.elements.cta_label.value.trim();
        const ctaUrl = form.elements.cta_url.value.trim();
        const displayOrderRaw = form.elements.display_order.value.trim();
        if (!title) return "見出しは必須です。";
        if (title.length > 60) return "見出しは60文字以内で入力してください。";
        if (!leadText) return "リード文は必須です。";
        if (leadText.length > 160) return "リード文は160文字以内で入力してください。";
        if (!ctaLabel) return "CTA文言は必須です。";
        if (ctaLabel.length > 20) return "CTA文言は20文字以内で入力してください。";
        if (!ctaUrl) return "遷移先URLは必須です。";
        if (ctaUrl.length > 255) return "遷移先URLは255文字以内で入力してください。";
        if (!isAllowedAdminUrl(ctaUrl)) {
            return "遷移先URLは / から始まる相対パス、または http:// / https:// で入力してください。";
        }
        try {
            new URL(ctaUrl, window.location.origin);
        } catch {
            return "遷移先URLの形式が正しくありません。";
        }
        const displayOrder = Number(displayOrderRaw);
        if (!Number.isInteger(displayOrder) || displayOrder < 1) {
            return "表示順は1以上の整数で入力してください。";
        }
        const duplicate = rows.find((row) => String(row.id) !== String(recordIdValue) && Number(row.display_order) === displayOrder && !row.deleted_at);
        if (duplicate) {
            return "表示順が重複しています。別の番号を指定してください。";
        }
        return "";
    };
    const bindEvents = () => {
        const loginForm = main.querySelector('[data-form="login"]');
        if (loginForm) loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = loginForm.elements.email.value.trim();
            const password = loginForm.elements.password.value;
            if (!email || !password) return setNotice("メールアドレスとパスワードを入力してください。", "warn");
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) return setNotice(`ログインに失敗しました: ${error.message}`, "error");
            redirect("appDashboard");
        });
        const forgotForm = main.querySelector('[data-form="forgot-password"]');
        if (forgotForm) forgotForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = forgotForm.elements.email.value.trim();
            if (!email) return setNotice("メールアドレスを入力してください。", "warn");
            const redirectTo = getAdminResetRedirectUrl();
            const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
            if (error) return setNotice(`送信に失敗しました: ${error.message}`, "error");
            setNotice("再設定メールを送信しました。受信箱を確認してください。", "success");
        });
        const resetForm = main.querySelector('[data-form="reset-password"]');
        if (resetForm) resetForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const password = resetForm.elements.password.value;
            const confirm = resetForm.elements.password_confirm.value;
            if (!password || password.length < 8) return setNotice("新しいパスワードは8文字以上で入力してください。", "warn");
            if (password !== confirm) return setNotice("確認用パスワードが一致しません。", "warn");
            const { error } = await supabase.auth.updateUser({ password });
            if (error) return setNotice(`更新に失敗しました: ${error.message}`, "error");
            setNotice("パスワードを更新しました。ログイン画面へ戻ります。", "success");
            window.setTimeout(() => redirect("appLogin"), 1200);
        });
        main.querySelectorAll('[data-action="logout"]').forEach((btn) => btn.addEventListener("click", async () => {
            await supabase.auth.signOut();
            redirect("appLogin");
        }));
        main.querySelectorAll('[data-action="select-hero"]').forEach((btn) => btn.addEventListener("click", () => {
            state.selectedHeroId = btn.dataset.recordId || "";
            clearNotice();
            render();
        }));
        main.querySelectorAll('[data-action="select-step"]').forEach((btn) => btn.addEventListener("click", () => {
            state.selectedStepId = btn.dataset.recordId || "";
            clearNotice();
            render();
        }));
        const heroSave = main.querySelector('[data-form="hero-save"]');
        if (heroSave) heroSave.addEventListener("submit", async (e) => {
            e.preventDefault();
            const validationMessage = validateHeroForm(heroSave, state.heroItems, heroSave.elements.record_id_value.value);
            if (validationMessage) return setNotice(validationMessage, "warn");
            await saveRecord("top_hero_items", state.heroItems, heroSave.elements.record_id_value.value, new FormData(heroSave));
        });
        const stepSave = main.querySelector('[data-form="journey-save"]');
        if (stepSave) stepSave.addEventListener("submit", async (e) => {
            e.preventDefault();
            await saveRecord("journey_steps", state.journeySteps, stepSave.elements.record_id_value.value, new FormData(stepSave));
        });
    };
    const restoreResetSession = async () => {
        if (pageKey !== "appPasswordReset") return;
        const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
        const params = new URLSearchParams(hash);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        if (!accessToken || !refreshToken) return;
        const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        if (error) setNotice(`再設定セッションの復元に失敗しました: ${error.message}`, "error");
        else window.history.replaceState({}, document.title, window.location.pathname);
    };
    const init = async () => {
        render();
        if (!supabase) return setNotice("Supabase 設定が不足しています。`js/site-config.js` を確認してください。", "error");
        await restoreResetSession();
        const { data, error } = await supabase.auth.getSession();
        if (error) return setNotice(`セッション確認に失敗しました: ${error.message}`, "error");
        state.session = data.session;
        state.user = data.session?.user || null;
        if (pageKey === "appLogin" && state.user) return redirect("appDashboard");
        if (protectedPages.has(pageKey) && !state.user) return redirect("appLogin");
        if (state.user) {
            state.queryWarnings = [];
            state.profile = await loadProfile(state.user.id);
            state.roles = await loadRoles(state.user.id, state.profile);
            render();
        }
        if (protectedPages.has(pageKey)) await loadPageData();
        supabase.auth.onAuthStateChange((_event, session) => {
            state.session = session;
            state.user = session?.user || null;
            if (!state.user && protectedPages.has(pageKey)) redirect("appLogin");
        });
    };
    init().catch((e) => setNotice(`初期化エラー: ${e.message}`, "error"));
})();
