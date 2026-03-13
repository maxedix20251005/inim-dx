(() => {
    const body = document.body;
    const main = document.getElementById('page-main');
    if (!main) {
        return;
    }
    const root = body.dataset.root || '.';
    const pageKey = body.dataset.pageKey || 'home';

    const pages = {
        home: { path: 'index.html', label: 'Home', title: 'inim-dx top page', latest: 'デジタル調香体験からワークショップ予約までをつなぐ新しいトップページ構成を公開しました。' },
        about: { path: 'subpages/about.html', label: 'About', title: 'About inim-dx', latest: 'ブランド概要ページは現在作成準備中です。' },
        brand: { path: 'subpages/brand.html', label: 'ブランド', title: 'Brand', latest: 'ブランドカテゴリページは現在作成準備中です。' },
        brandGroundbreakers: { path: 'subpages/brand-groundbreakers.html', label: 'GROUNDBREAKERS', title: 'Brand / GROUNDBREAKERS', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandNezs: { path: 'subpages/brand-nezs.html', label: "NEZ's", title: "Brand / NEZ's", latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandAromaCrops: { path: 'subpages/brand-aroma-crops.html', label: 'AROMA CROPS', title: 'Brand / AROMA CROPS', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandKosaido: { path: 'subpages/brand-kosaido.html', label: '香彩堂', title: 'Brand / 香彩堂', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandWatoyo: { path: 'subpages/brand-watoyo.html', label: 'WATOYO', title: 'Brand / WATOYO', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandCocktailSoap: { path: 'subpages/brand-cocktail-soap.html', label: 'COCKTAIL SOAP', title: 'Brand / COCKTAIL SOAP', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandEnjoyth: { path: 'subpages/brand-enjoyth.html', label: 'ENJOYNTH', title: 'Brand / ENJOYNTH', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandAwaji: { path: 'subpages/brand-awaji.html', label: 'AWAJI', title: 'Brand / AWAJI', latest: 'ブランド詳細ページは現在作成準備中です。' },
        brandPropolis: { path: 'subpages/brand-propolis.html', label: '日プロポリース', title: 'Brand / 日プロポリース', latest: 'ブランド詳細ページは現在作成準備中です。' },
        items: { path: 'subpages/items.html', label: 'アイテム', title: 'Items', latest: 'アイテムカテゴリページは現在作成準備中です。' },
        itemHomeFragrance: { path: 'subpages/item-home-fragrance.html', label: 'ホームフレグランス', title: 'Item / Home Fragrance', latest: 'アイテム詳細ページは現在作成準備中です。' },
        itemBodyCare: { path: 'subpages/item-body-care.html', label: 'ボディケア', title: 'Item / Body Care', latest: 'アイテム詳細ページは現在作成準備中です。' },
        itemDiy: { path: 'subpages/item-diy.html', label: 'DIY', title: 'Item / DIY', latest: 'アイテム詳細ページは現在作成準備中です。' },
        itemSale: { path: 'subpages/item-sale.html', label: 'SALE', title: 'Item / Sale', latest: 'アイテム詳細ページは現在作成準備中です。' },
        itemEcology: { path: 'subpages/item-ecology.html', label: 'エコロジー', title: 'Item / Ecology', latest: 'アイテム詳細ページは現在作成準備中です。' },
        itemRefillTools: { path: 'subpages/item-refill-tools.html', label: '詰め替えツール', title: 'Item / Refill Tools', latest: 'アイテム詳細ページは現在作成準備中です。' },
        itemGiftSet: { path: 'subpages/item-gift-set.html', label: 'ギフトセット', title: 'Item / Gift Set', latest: 'アイテム詳細ページは現在作成準備中です。' },
        scentSearch: { path: 'subpages/scent-search.html', label: '香りから探す', title: 'Search by Scent', latest: '香りから探すページは現在作成準備中です。' },
        searchStoreInfo: { path: 'subpages/search-store-info.html', label: '実店舗情報', title: 'Search / Store Info', latest: '関連ページは現在作成準備中です。' },
        searchProjects: { path: 'subpages/search-projects.html', label: 'プロジェクト・読み物', title: 'Search / Projects', latest: '関連ページは現在作成準備中です。' },
        searchEvents: { path: 'subpages/search-events.html', label: 'イベント情報', title: 'Search / Events', latest: '関連ページは現在作成準備中です。' },
        workshop: { path: 'subpages/workshop.html', label: '香りと遊ぶ', title: 'Workshop', latest: '香りのワークショップ予約ページを公開しました。デジタル体験から店頭予約まで一続きで案内します。' },
        smartScent: { path: 'subpages/smart-scent-design.html', label: 'Smart Scent Design', title: 'Smart Scent Design', latest: '色・粒子・サウンドを使って、自分の香りを視覚的に編集するデジタル調香ページです。' },
        article: { path: 'subpages/article.html', label: '記事', title: 'Article', latest: '記事一覧ページは現在作成準備中です。' },
        sale: { path: 'subpages/sale.html', label: 'Sale', title: 'Sale', latest: 'セールページは現在作成準備中です。' },
        stores: { path: 'subpages/stores.html', label: '実店舗', title: 'Stores', latest: '実店舗ページは現在作成準備中です。' },
        account: { path: 'subpages/account.html', label: 'マイアカウント', title: 'My Account', latest: 'アカウント関連ページは現在作成準備中です。' },
        shoppingGuide: { path: 'subpages/shopping-guide.html', label: 'ショッピングガイド', title: 'Shopping Guide', latest: 'ショッピングガイドページは現在作成準備中です。' },
        legal: { path: 'subpages/legal.html', label: '法的表示', title: 'Legal', latest: '法的表示ページは現在作成準備中です。' },
        contact: { path: 'subpages/contact.html', label: 'お問い合わせ', title: 'Contact', latest: 'お問い合わせページは現在作成準備中です。' },
        newsletter: { path: 'subpages/newsletter.html', label: 'メルマガ登録・解除', title: 'Newsletter', latest: 'メルマガ関連ページは現在作成準備中です。' },
        register: { path: 'subpages/register.html', label: '会員登録', title: 'Register', latest: '会員登録ページは現在作成準備中です。' },
        login: { path: 'subpages/login.html', label: 'ログイン', title: 'Login', latest: 'ログインページは現在作成準備中です。' },
        cart: { path: 'subpages/cart.html', label: 'カート', title: 'Cart', latest: 'カートページは現在作成準備中です。' },
        privacy: { path: 'subpages/privacy.html', label: 'プライバシーポリシー', title: 'Privacy Policy', latest: 'プライバシーポリシーページは現在作成準備中です。' },
        rss: { path: 'subpages/rss.html', label: 'RSS / ATOM', title: 'RSS / ATOM', latest: 'RSS / ATOM ページは現在作成準備中です。' }
        ,
        appLogin: { path: 'app/login.html', label: 'App Login', title: 'App / Login', latest: '管理アプリ画面は現在作成準備中です。' },
        appPasswordForgot: { path: 'app/password/forgot.html', label: 'Forgot Password', title: 'App / Password Forgot', latest: '管理アプリ画面は現在作成準備中です。' },
        appPasswordReset: { path: 'app/password/reset.html', label: 'Reset Password', title: 'App / Password Reset', latest: '管理アプリ画面は現在作成準備中です。' },
        appDashboard: { path: 'app/dashboard.html', label: 'Dashboard', title: 'App / Dashboard', latest: '管理アプリ画面は現在作成準備中です。' },
        appPagesHome: { path: 'app/pages/home.html', label: 'Home Admin', title: 'App / Home Management', latest: '管理アプリ画面は現在作成準備中です。' },
        appPagesWorkshop: { path: 'app/pages/workshop.html', label: 'Workshop Admin', title: 'App / Workshop Management', latest: '管理アプリ画面は現在作成準備中です。' },
        appPublish: { path: 'app/publish.html', label: 'Publish', title: 'App / Publish', latest: '管理アプリ画面は現在作成準備中です。' },
        appUsersMe: { path: 'app/users/me.html', label: 'Account Settings', title: 'App / Account Settings', latest: '管理アプリ画面は現在作成準備中です。' }
    };

    const currentPage = pages[pageKey] || pages.home;
    let currentSession = null;
    let currentUser = null;
    const siteConfig = window.INIM_SITE_CONFIG || {};
    const supabaseConfig = {
        url: siteConfig.supabaseUrl || '',
        publishableKey: siteConfig.supabasePublishableKey || ''
    };
    const authRedirectUrl = siteConfig.authRedirectUrl || '';
    const hasSupabaseConfig = Boolean(supabaseConfig.url && supabaseConfig.publishableKey);
    const supabaseApi = window.supabase || null;
    const supabase = hasSupabaseConfig && supabaseApi?.createClient
        ? supabaseApi.createClient(supabaseConfig.url, supabaseConfig.publishableKey)
        : null;
    const modalPageKeys = new Set(["login", "register", "account"]);
    const modalTitles = {
        login: "ログイン",
        register: "新規会員登録",
        forgot: "パスワード再設定",
        account: "マイアカウント",
        profile: "プロファイル編集",
        password: "パスワード変更",
        delete: "退会手続き"
    };
    const t = {
        login: 'ログイン',
        register: '新規会員登録'
    };


    const link = (key, hash = '') => `${root}/${pages[key].path}${hash}`;
    const isCurrent = (key) => key === pageKey ? ' is-current' : '';
    const accountHref = (mode) => `${window.location.pathname}#${mode}`;
    const accountModalLink = (mode, label, className = '') => `<a class="${className}" href="${accountHref(mode)}" data-account-modal="${mode}">${label}</a>`;
    const accountLogoutLink = (className = '') => `<a class="${className}" href="${window.location.pathname}#logout" data-account-logout="true">ログアウト</a>`;

    const sidebarGroups = [
        {
            title: 'ブランド',
            key: 'brand',
            items: ['brandGroundbreakers', 'brandNezs', 'brandAromaCrops', 'brandKosaido', 'brandWatoyo', 'brandCocktailSoap', 'brandEnjoyth', 'brandAwaji', 'brandPropolis']
        },
        {
            title: 'アイテム',
            key: 'items',
            items: ['itemHomeFragrance', 'itemBodyCare', 'itemDiy', 'itemSale', 'itemEcology', 'itemRefillTools', 'itemGiftSet']
        },
        {
            title: '香りから探す',
            key: 'scentSearch',
            items: ['searchStoreInfo', 'searchProjects', 'searchEvents']
        },
        {
            title: '香りと遊ぶ',
            key: 'workshop',
            items: [
                { label: '香游について', href: link('workshop') },
                { label: '体験の流れ', href: `${root}/index.html#journey` },
                { label: '体験を始める', href: link('smartScent') }
            ]
        },
        {
            title: '記事',
            key: 'article',
            items: [{ label: '記事一覧', href: link('article') }]
        },
        {
            title: 'Sale',
            key: 'sale',
            items: [{ label: 'セール一覧', href: link('sale') }]
        },
        {
            title: '実店舗',
            key: 'stores',
            items: [
                { label: '浅草店', href: `${link('stores')}#asakusa` },
                { label: '柴又店', href: `${link('stores')}#shibamata` },
                { label: 'ソラマチ店', href: `${link('stores')}#solamachi` }
            ]
        }
    ];

    const standaloneLinks = [
        { key: 'shoppingGuide', label: 'ショッピングガイド' },
        { key: 'account', label: 'マイアカウント', modal: 'account' },
        { key: 'register', label: '会員登録', modal: 'register' },
        { key: 'login', label: 'ログイン', modal: 'login' }
    ];

    const renderSidebarLinks = (group) => {
        if (Array.isArray(group.items) && typeof group.items[0] === 'string') {
            return group.items
                .map((key) => `<a class="${isCurrent(key).trim()}" href="${link(key)}">${pages[key].label}</a>`)
                .join('');
        }

        return group.items
            .map((item) => `<a href="${item.href}">${item.label}</a>`)
            .join('');
    };

    const renderStandaloneLink = (item) => item.modal
        ? `<a class="${isCurrent(item.key).trim()}" href="${accountHref(item.modal)}" data-account-modal="${item.modal}">${item.label}</a>`
        : `<a class="${isCurrent(item.key).trim()}" href="${link(item.key)}">${item.label}</a>`;

    const openGroups = new Set(['brand', 'items', 'scentSearch', 'workshop', 'stores']);
    const currentTopLevel = {
        about: 'brand',
        brand: 'brand',
        brandGroundbreakers: 'brand',
        brandNezs: 'brand',
        brandAromaCrops: 'brand',
        brandKosaido: 'brand',
        brandWatoyo: 'brand',
        brandCocktailSoap: 'brand',
        brandEnjoyth: 'brand',
        brandAwaji: 'brand',
        brandPropolis: 'brand',
        items: 'items',
        itemHomeFragrance: 'items',
        itemBodyCare: 'items',
        itemDiy: 'items',
        itemSale: 'items',
        itemEcology: 'items',
        itemRefillTools: 'items',
        itemGiftSet: 'items',
        scentSearch: 'scentSearch',
        searchStoreInfo: 'scentSearch',
        searchProjects: 'scentSearch',
        searchEvents: 'scentSearch',
        workshop: 'workshop',
        smartScent: 'workshop',
        article: 'article',
        sale: 'sale',
        stores: 'stores',
        account: null,
        shoppingGuide: null,
        legal: null,
        contact: null,
        newsletter: null,
        register: null,
        login: null,
        cart: null,
        privacy: null,
        rss: null
    }[pageKey];

    if (currentTopLevel) {
        openGroups.add(currentTopLevel);
    }

    const sidebarHtml = `
        <a class="sidebar__brand" href="${link('home')}" aria-label="inim-dx top">
            <img class="sidebar__brand-logo" src="${root}/images/logo/logo-inim-dx.jpg" alt="inim-dx logo">
            <span class="sidebar__brand-note">Fragrance Experience Platform</span>
        </a>
        <nav class="sidebar__nav" aria-label="サイドナビゲーション">
            ${sidebarGroups.map((group) => `
                <details class="sidebar__group sidebar__group--drilldown" ${openGroups.has(group.key) ? 'open' : ''}>
                    <summary class="sidebar__summary">${group.title}</summary>
                    <div class="sidebar__links">${renderSidebarLinks(group)}</div>
                </details>
            `).join('')}
            <div class="sidebar__standalone">
                ${standaloneLinks.map((item) => renderStandaloneLink(item)).join('')}
            </div>
        </nav>
    `;

    const headerHtml = `
        <div class="notice-bar">
            <p>配送・返品・お支払いに関する最新情報をご案内しています。</p>
            <div class="notice-bar__actions">
                <a href="${link('shoppingGuide')}">ショッピングガイド</a>
                <a href="${link('contact')}">お問い合わせ</a>
            </div>
        </div>
        <div class="utility-header">
            <a class="utility-header__brand" href="${link('home')}">${currentPage.title}</a>
            <div class="utility-header__tools">
                <a href="${link('scentSearch')}">検索</a>
                ${accountModalLink('account', 'マイアカウント')}
                <a href="${link('cart')}">カート</a>
            </div>
        </div>
        <nav class="category-nav" aria-label="グローバルナビゲーション">
            <a class="${isCurrent('home').trim()}" href="${link('home')}">Home</a>
            <a class="${['about', 'brand', 'brandGroundbreakers', 'brandNezs', 'brandAromaCrops', 'brandKosaido', 'brandWatoyo', 'brandCocktailSoap', 'brandEnjoyth', 'brandAwaji', 'brandPropolis'].includes(pageKey) ? 'is-current' : ''}" href="${link('brand')}">ブランド</a>
            <a class="${['items', 'itemHomeFragrance', 'itemBodyCare', 'itemDiy', 'itemSale', 'itemEcology', 'itemRefillTools', 'itemGiftSet'].includes(pageKey) ? 'is-current' : ''}" href="${link('items')}">アイテム</a>
            <a class="${['scentSearch', 'searchStoreInfo', 'searchProjects', 'searchEvents'].includes(pageKey) ? 'is-current' : ''}" href="${link('scentSearch')}">香りから探す</a>
            <a class="${['workshop', 'smartScent'].includes(pageKey) ? 'is-current' : ''}" href="${link('workshop')}">香りと遊ぶ</a>
            <a class="${pageKey === 'article' ? 'is-current' : ''}" href="${link('article')}">記事</a>
            <a class="${['sale', 'itemSale'].includes(pageKey) ? 'is-current' : ''}" href="${link('sale')}">Sale</a>
            <a class="${pageKey === 'stores' ? 'is-current' : ''}" href="${link('stores')}">実店舗</a>
        </nav>
        <div class="news-strip">
            <span>Latest</span>
            <p>${currentPage.latest}</p>
        </div>
    `;

    const footerHtml = `
        <div class="site-footer__grid" id="footer-links">
            <div>
                <p class="site-footer__title">Store Info</p>
                <p>inim-dx flagship atelier<br>Fragrance workshop and consultation by reservation.</p>
            </div>
            <div>
                <p class="site-footer__title">Guide</p>
                <a href="${link('home')}">Top</a>
                <a href="${link('shoppingGuide')}">配送・送料について</a>
                <a href="${link('shoppingGuide')}">返品について</a>
                <a href="${link('shoppingGuide')}">お支払い方法について</a>
                <a href="${link('legal')}">法的表示</a>
            </div>
            <div>
                <p class="site-footer__title">Support</p>
                <a href="${link('privacy')}">プライバシーポリシー</a>
                <a href="${link('newsletter')}">メルマガ登録・解除</a>
                <a href="${link('rss')}">RSS / ATOM</a>
            </div>
            <div>
                <p class="site-footer__title">Account</p>
                ${accountModalLink('account', 'マイアカウント')}
                ${accountModalLink('register', '会員登録')}
                ${accountModalLink('login', 'ログイン')}
                <a href="${link('contact')}">お問い合わせ</a>
            </div>
        </div>
        <p class="site-footer__copy">inim-dx pages aligned to the sitemap, wireframe, and design guide.</p>
    `;

    const accountGatewayHtml = `
            <section class="account-gateway">
                <div class="account-gateway__panel">
                    <p class="account-gateway__eyebrow">Customer Account</p>
                    <h1>${modalTitles[pageKey] || "マイアカウント"}</h1>
                    <p class="account-gateway__lead">This entry page opens the shared customer account modal. The final implementation will connect to Supabase Auth and profile data.</p>
                    <div class="account-gateway__actions">
                        ${accountModalLink("login", "ログイン", "button button--secondary")}
                        ${accountModalLink("register", "新規会員登録", "button")}
                        ${accountModalLink("account", "マイアカウントを見る", "button button--ghost")}
                    </div>
                </div>
            </section>
        `;

    if (!main.innerHTML.trim()) {
        main.innerHTML = modalPageKeys.has(pageKey) ? accountGatewayHtml : `
            <section class="placeholder-page">
                <div class="placeholder-stage">
                    <div class="placeholder-panel">
                        <div class="placeholder-illustration" aria-hidden="true">
                            <div class="placeholder-sign">
                                <span>Under</span>
                                <span>Construction</span>
                            </div>
                            <div class="placeholder-cone placeholder-cone--left"></div>
                            <div class="placeholder-cone placeholder-cone--right"></div>
                            <div class="placeholder-tool"></div>
                        </div>
                        <p class="placeholder-kicker">Preparing Page</p>
                        <h1>${currentPage.label}</h1>
                        <p>This page is being prepared. The shared structure is already aligned, and content will be added incrementally.</p>
                    </div>
                </div>
            </section>
        `;
    }

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'メニューを開く');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'sidebar');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    const shell = document.createElement('div');
    shell.className = 'page-shell';

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    sidebar.innerHTML = sidebarHtml;

    const pageContent = document.createElement('div');
    pageContent.className = 'page-content';

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = headerHtml;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.id = 'contact';
    footer.innerHTML = footerHtml;

    const renderHeaderTools = () => {
        const tools = header.querySelector('.utility-header__tools');
        if (!tools) { return; }
        tools.innerHTML = currentUser
            ? `<a href="${link('scentSearch')}">検索</a>${accountModalLink('account', 'マイアカウント')}${accountLogoutLink()}<a href="${link('cart')}">カート</a>`
            : `<a href="${link('scentSearch')}">検索</a>${accountModalLink('login', 'ログイン')}${accountModalLink('register', '会員登録') }<a href="${link('cart')}">カート</a>`;
    };

    const renderSidebarAccountLinks = () => {
        const standalone = sidebar.querySelector('.sidebar__standalone');
        if (!standalone) { return; }
        standalone.innerHTML = currentUser
            ? `<a class="${isCurrent('shoppingGuide').trim()}" href="${link('shoppingGuide')}">ショッピングガイド</a>${accountModalLink('account', 'マイアカウント')}${accountLogoutLink()}`
            : `<a class="${isCurrent('shoppingGuide').trim()}" href="${link('shoppingGuide')}">ショッピングガイド</a>${accountModalLink('register', '会員登録')}${accountModalLink('login', 'ログイン')}`;
    };

    const renderFooterAccountLinks = () => {
        const accountColumn = footer.querySelector('.site-footer__grid > div:last-child');
        if (!accountColumn) { return; }
        accountColumn.innerHTML = currentUser
            ? `<p class="site-footer__title">Account</p>${accountModalLink('account', 'マイアカウント')}${accountLogoutLink()}<a href="${link('contact')}">お問い合わせ</a>`
            : `<p class="site-footer__title">Account</p>${accountModalLink('register', '会員登録')}${accountModalLink('login', 'ログイン') }<a href="${link('contact')}">お問い合わせ</a>`;
    };

    const syncAuthUi = () => {
        renderHeaderTools();
        renderSidebarAccountLinks();
        renderFooterAccountLinks();
    };

    const applyAuthSession = (session) => {
        currentSession = session;
        currentUser = session?.user || null;
        syncAuthUi();
    };

    const initAuthState = async () => {
        syncAuthUi();
        if (!supabase) { return; }
        const { data, error } = await supabase.auth.getSession();
        if (!error) {
            applyAuthSession(data.session);
        }
        supabase.auth.onAuthStateChange((_event, session) => {
            applyAuthSession(session);
        });
    };


    const modalHost = document.createElement('div');
    modalHost.innerHTML = `
        <div class="account-modal" id="account-modal" aria-hidden="true">
            <div class="account-modal__backdrop" data-account-close></div>
            <div class="account-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
                <button class="account-modal__close" type="button" aria-label="close" data-account-close>&times;</button>
                <div class="account-modal__header">
                    <p class="account-modal__eyebrow">inim-dx account</p>
                    <h2 class="account-modal__title" id="account-modal-title">マイアカウント</h2>
                    <p class="account-modal__lead" id="account-modal-lead"></p>
                </div>
                <div class="account-modal__body" id="account-modal-body"></div>
            </div>
        </div>
    `;

    pageContent.appendChild(header);
    pageContent.appendChild(main);
    pageContent.appendChild(footer);
    shell.appendChild(sidebar);
    shell.appendChild(pageContent);

    body.prepend(hamburger);
    body.appendChild(shell);
    body.appendChild(modalHost.firstElementChild);

    const modal = document.getElementById('account-modal');
    const modalTitle = document.getElementById('account-modal-title');
    const modalLead = document.getElementById('account-modal-lead');
    const modalBody = document.getElementById('account-modal-body');
    let previousFocus = null;

    const setModalStatus = (message = '', type = 'info') => {
        const status = modalBody.querySelector('[data-account-status]');
        if (!status) {
            return;
        }
        status.textContent = message;
        status.dataset.state = message ? type : '';
        status.hidden = !message;
    };

    const accountSample = {
        name: '香遊 花子',
        displayName: 'Hanako',
        email: 'hanako@example.com',
        status: '有効',
        store: '浅草店',
        joinedAt: '2026-03-12'
    };

    const modalLeads = {
        login: 'ご登録済みのお客様はこちらからログインしてください。今後、予約情報や調香履歴もここに連携されます。',
        register: '予約情報やお好みデータを管理する会員アカウントを作成します。',
        forgot: 'ご登録メールアドレス宛に、パスワード再設定用のメールを送信します。',
        account: 'お客様向けのアカウント画面です。今後、予約状況やお気に入り情報もここに集約します。',
        profile: 'お名前・表示名・メールアドレスを編集できます。',
        password: '現在のパスワードを確認しながら、安全に変更します。',
        delete: '退会には再認証と最終確認が必要です。'
    };

    const fieldErrorHtml = (name) => `<p class="account-error-text" data-field-error="${name}" hidden></p>`;
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const renderAccountView = (mode) => {
        if (mode === 'login') {
            return `<form class="account-form" novalidate><label class="account-field"><span>メールアドレス</span><input type="email" name="email" placeholder="you@example.com" autocomplete="email"></label>${fieldErrorHtml('email')}<label class="account-field"><span>パスワード</span><input type="password" name="password" placeholder="8文字以上" autocomplete="current-password"></label>${fieldErrorHtml('password')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><label class="account-check"><input type="checkbox" name="remember"><span>ログイン状態を保持する</span></label><div class="account-form__actions"><button class="button" type="submit">${t.login}</button></div><div class="account-inline-links"><a href="#forgot" data-account-switch="forgot">パスワードをお忘れですか？</a><a href="#register" data-account-switch="register">${t.register}</a></div></form>`;
        }
        if (mode === 'register') {
            return `<form class="account-form" novalidate><label class="account-field"><span>お名前</span><input type="text" name="name" placeholder="${accountSample.name}" autocomplete="name"></label>${fieldErrorHtml('name')}<label class="account-field"><span>表示名</span><input type="text" name="display_name" placeholder="${accountSample.displayName}" autocomplete="nickname"></label>${fieldErrorHtml('display_name')}<label class="account-field"><span>メールアドレス</span><input type="email" name="email" placeholder="you@example.com" autocomplete="email"></label>${fieldErrorHtml('email')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__split"><div><label class="account-field"><span>パスワード</span><input type="password" name="password" placeholder="8文字以上" autocomplete="new-password"></label>${fieldErrorHtml('password')}</div><div><label class="account-field"><span>パスワード確認</span><input type="password" name="password_confirm" placeholder="もう一度入力" autocomplete="new-password"></label>${fieldErrorHtml('password_confirm')}</div></div><label class="account-check"><input type="checkbox" name="terms"><span>利用規約とプライバシーポリシーに同意します。</span></label>${fieldErrorHtml('terms')}<div class="account-form__actions"><button class="button" type="submit">${t.register}</button></div><div class="account-inline-links"><a href="#login" data-account-switch="login">${t.login}</a></div></form>`;
        }
        if (mode === 'forgot') {
            return `<form class="account-form" novalidate><label class="account-field"><span>ご登録メールアドレス</span><input type="email" name="email" placeholder="you@example.com" autocomplete="email"></label>${fieldErrorHtml('email')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__actions"><button class="button" type="submit">再設定メールを送信</button></div><div class="account-inline-links"><a href="#login" data-account-switch="login">${t.login}</a></div></form>`;
        }
        if (mode === 'profile') {
            return `<form class="account-form" novalidate><div class="account-summary"><div><span>登録日</span><strong>${accountSample.joinedAt}</strong></div><div><span>状態</span><strong>${accountSample.status}</strong></div></div><label class="account-field"><span>お名前</span><input type="text" name="name" value="${accountSample.name}"></label><label class="account-field"><span>表示名</span><input type="text" name="display_name" value="${accountSample.displayName}"></label><label class="account-field"><span>メールアドレス</span><input type="email" name="email" value="${accountSample.email}"></label><div class="account-form__actions"><button class="button" type="submit">保存</button><a class="button button--ghost" href="#account" data-account-switch="account">戻る</a></div></form>`;
        }
        if (mode === 'password') {
            return `<form class="account-form" novalidate><label class="account-field"><span>現在のパスワード</span><input type="password" name="current_password" placeholder="現在のパスワード"></label><label class="account-field"><span>新しいパスワード</span><input type="password" name="next_password" placeholder="8文字以上"></label><label class="account-field"><span>新しいパスワード確認</span><input type="password" name="next_password_confirm" placeholder="もう一度入力"></label><div class="account-form__actions"><button class="button" type="submit">更新</button><a class="button button--ghost" href="#account" data-account-switch="account">戻る</a></div></form>`;
        }
        if (mode === 'delete') {
            return `<div class="account-danger"><p>退会には再認証が必要です。実装段階では、即時削除ではなく soft delete もしくは退会フローを用意する想定です。</p><form class="account-form" novalidate><label class="account-field"><span>確認用パスワード</span><input type="password" name="confirm_password" placeholder="現在のパスワード"></label><div class="account-form__actions"><button class="button button--danger" type="submit">退会する</button><a class="button button--ghost" href="#account" data-account-switch="account">キャンセル</a></div></form></div>`;
        }
        return `<div class="account-card-grid"><article class="account-card account-card--accent"><p class="account-card__label">状態</p><strong>${accountSample.status}</strong><span>認証連携済み</span></article><article class="account-card"><p class="account-card__label">よく利用する店舗</p><strong>${accountSample.store}</strong><span>予約導線と連携予定</span></article></div><div class="account-summary account-summary--stack"><div><span>お名前</span><strong>${accountSample.name}</strong></div><div><span>表示名</span><strong>${accountSample.displayName}</strong></div><div><span>メールアドレス</span><strong>${accountSample.email}</strong></div><div><span>今後の機能</span><strong>予約履歴 / 調香履歴 / お気に入り</strong></div></div><div class="account-panel-actions"><a class="button" href="#profile" data-account-switch="profile">プロファイル編集</a><a class="button button--secondary" href="#password" data-account-switch="password">パスワード変更</a><a class="button button--ghost" href="#delete" data-account-switch="delete">退会手続き</a></div>`;
    };

    const setFieldError = (form, name, message = '') => {
        const field = form.elements[name];
        if (!field) {
            return;
        }

        const error = form.querySelector(`[data-field-error="${name}"]`);
        const wrapper = field.closest('.account-field, .account-check');

        field.classList.toggle('is-error', Boolean(message));
        if (wrapper) {
            wrapper.classList.toggle('is-error', Boolean(message));
        }
        if (error) {
            error.textContent = message;
            error.hidden = !message;
        }
    };

    const validateField = (form, mode, name) => {
        const field = form.elements[name];
        if (!field) {
            return true;
        }

        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        let message = '';

        if (name === 'email') {
            if (!value) {
                message = 'メールアドレスを入力してください。';
            } else if (!isValidEmail(String(value))) {
                message = 'メールアドレスの形式が正しくありません。';
            }
        }

        if (mode === 'login' && name === 'password' && !value) {
            message = 'パスワードを入力してください。';
        }

        if (mode === 'register') {
            if (name === 'name' && !value) {
                message = 'お名前を入力してください。';
            }
            if (name === 'display_name' && !value) {
                message = '表示名を入力してください。';
            }
            if (name === 'password') {
                if (!value) {
                    message = 'パスワードを入力してください。';
                } else if (String(value).length < 8) {
                    message = 'パスワードは8文字以上で入力してください。';
                }
            }
            if (name === 'password_confirm') {
                const password = form.elements.password?.value || '';
                if (!value) {
                    message = '確認用パスワードを入力してください。';
                } else if (String(value) !== password) {
                    message = 'パスワードが一致していません。';
                }
            }
            if (name === 'terms' && !value) {
                message = '利用規約とプライバシーポリシーへの同意が必要です。';
            }
        }

        setFieldError(form, name, message);
        return !message;
    };

    const validateForm = (form, mode) => {
        const fieldNames = {
            login: ['email', 'password'],
            forgot: ['email'],
            register: ['name', 'display_name', 'email', 'password', 'password_confirm', 'terms']
        }[mode] || [];

        let firstInvalid = null;
        fieldNames.forEach((name) => {
            const valid = validateField(form, mode, name);
            if (!valid && !firstInvalid) {
                firstInvalid = form.elements[name];
            }
        });

        return firstInvalid;
    };

    const openModal = (mode) => {
        previousFocus = document.activeElement;
        modal.dataset.mode = mode;
        modal.setAttribute('aria-hidden', 'false');
        body.classList.add('account-modal-open');
        modalTitle.textContent = modalTitles[mode] || 'マイアカウント';
        modalLead.textContent = modalLeads[mode] || '';
        modalBody.innerHTML = renderAccountView(mode);
        if (modalPageKeys.has(pageKey)) {
            window.history.replaceState(null, '', `${window.location.pathname}#${mode}`);
        }
        const firstField = modalBody.querySelector('input, button, a');
        if (firstField) {
            firstField.focus();
        }
    };

    const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        modalBody.innerHTML = '';
        body.classList.remove('account-modal-open');
        window.history.replaceState(null, '', window.location.pathname);
        if (previousFocus instanceof HTMLElement) {
            previousFocus.focus();
        }
    };

    const updateFloatingNav = () => {
        const globalNav = document.querySelector('.category-nav');
        if (!globalNav) {
            return;
        }

        const navTop = globalNav.dataset.initialTop
            ? Number(globalNav.dataset.initialTop)
            : globalNav.offsetTop;

        if (!globalNav.dataset.initialTop) {
            globalNav.dataset.initialTop = String(navTop);
        }

        globalNav.classList.toggle('is-floating', window.scrollY > navTop);
    };

    hamburger.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    sidebar.querySelectorAll('a').forEach((item) => {
        item.addEventListener('click', () => {
            sidebar.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    body.addEventListener('click', (event) => {
        const logoutTrigger = event.target.closest('[data-account-logout]');
        if (logoutTrigger) {
            event.preventDefault();
            if (supabase) {
                void supabase.auth.signOut();
            }
            closeModal();
            return;
        }

        const modalTrigger = event.target.closest('[data-account-modal]');
        if (modalTrigger) {
            event.preventDefault();
            const triggerHref = modalTrigger.getAttribute('href');
            if (triggerHref) {
                window.history.pushState(null, '', triggerHref);
            }
            openModal(modalTrigger.dataset.accountModal);
            return;
        }

        const modalSwitch = event.target.closest('[data-account-switch]');
        if (modalSwitch) {
            event.preventDefault();
            const switchHref = modalSwitch.getAttribute('href');
            if (switchHref) {
                window.history.pushState(null, '', switchHref);
            }
            openModal(modalSwitch.dataset.accountSwitch);
            return;
        }

        if (event.target.closest('[data-account-close]')) {
            closeModal();
        }
    });


    modalBody.addEventListener('focusout', (event) => {
        const field = event.target.closest('input');
        const mode = modal.dataset.mode;
        if (!field || !['login', 'forgot', 'register'].includes(mode)) {
            return;
        }

        const form = field.form || event.target.closest('form');
        if (!form || !field.name) {
            return;
        }

        validateField(form, mode, field.name);
    });

    modalBody.addEventListener('input', (event) => {
        const field = event.target.closest('input');
        const mode = modal.dataset.mode;
        if (!field || !['login', 'forgot', 'register'].includes(mode) || field.type === 'checkbox') {
            return;
        }

        const form = field.form || event.target.closest('form');
        if (!form || !field.name) {
            return;
        }

        validateField(form, mode, field.name);
        if (!form.querySelector('.is-error')) {
            setModalStatus('');
        }
    });

    modalBody.addEventListener('change', (event) => {
        const field = event.target.closest('input');
        const mode = modal.dataset.mode;
        if (!field || !['login', 'forgot', 'register'].includes(mode)) {
            return;
        }

        const form = field.form || event.target.closest('form');
        if (!form || !field.name) {
            return;
        }

        validateField(form, mode, field.name);
        if (!form.querySelector('.is-error')) {
            setModalStatus('');
        }
    });

    modal.addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target.closest('form');
        const mode = modal.dataset.mode;
        if (!form || !['login', 'forgot', 'register'].includes(mode)) {
            return;
        }

        const firstInvalidField = validateForm(form, mode);
        if (firstInvalidField) {
            setModalStatus('入力内容をご確認ください。', 'error');
            firstInvalidField.focus();
            return;
        }

        const email = form.elements.email?.value?.trim() || '';
        if (!supabase) {
            setModalStatus('Supabase の設定または CDN 読み込みを確認してください。', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            if (mode === 'login') {
                const password = form.elements.password?.value || '';
                setModalStatus('ログインを確認しています...', 'info');
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    throw error;
                }
                openModal('account');
                return;
            }

            if (mode === 'register') {
                const name = form.elements.name?.value?.trim() || '';
                const displayName = form.elements.display_name?.value?.trim() || '';
                const password = form.elements.password?.value || '';

                setModalStatus('会員登録を処理しています...', 'info');
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: authRedirectUrl || undefined,
                        data: {
                            name,
                            display_name: displayName
                        }
                    }
                });
                if (error) {
                    throw error;
                }

                if (data?.session) {
                    setModalStatus('会員登録が完了しました。アカウント画面へ移動します。', 'success');
                    openModal('account');
                    return;
                }

                setModalStatus('確認メールを送信しました。メール内のリンクから登録を完了してください。', 'success');
                return;
            }

            setModalStatus('再設定メールを送信しています...', 'info');
            const { error } = await supabase.auth.resetPasswordForEmail(
                email,
                authRedirectUrl ? { redirectTo: authRedirectUrl } : undefined
            );
            if (error) {
                throw error;
            }
            setModalStatus('パスワード再設定メールを送信しました。受信ボックスをご確認ください。', 'success');
        } catch (error) {
            setModalStatus(error?.message || '処理に失敗しました。', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

    void initAuthState();
    updateFloatingNav();
    window.addEventListener('scroll', updateFloatingNav, { passive: true });
    window.addEventListener('resize', () => {
        const globalNav = document.querySelector('.category-nav');
        if (globalNav) {
            delete globalNav.dataset.initialTop;
        }
        updateFloatingNav();
    });

    if (modalPageKeys.has(pageKey)) {
        const requestedMode = window.location.hash.replace('#', '') || pageKey;
        openModal(modalTitles[requestedMode] ? requestedMode : pageKey);
    }

    document.dispatchEvent(new CustomEvent('site-shell:ready', { detail: { pageKey, root } }));
})();





















