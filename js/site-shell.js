(() => {
    const body = document.body;
    const main = document.getElementById('page-main');
    if (!main) {
        return;
    }
    const root = body.dataset.root || '.';
    const pageKey = body.dataset.pageKey || 'home';
    const initialHash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
    const initialHashParams = initialHash.includes('=') ? new URLSearchParams(initialHash) : new URLSearchParams();

    const pages = {
        home: { path: 'index.html', label: 'Home', title: 'inim-dx top page', latest: 'デジタル調香体験からワークショップ予約までをつなぐ新しいトップページ構成を公開しました。' },
        about: { path: 'subpages/about.html', label: 'About', title: 'About inim-dx', latest: 'inim-dx の考え方と体験設計方針をまとめた About ページを公開しました。' },
        brand: { path: 'subpages/brand.html', label: 'ブランド', title: 'Brand', latest: 'ブランド方針と公開ブランド導線を整理したブランドハブページを公開しました。' },
        brandGroundbreakers: { path: 'subpages/brand-groundbreakers.html', label: 'GROUNDBREAKERS', title: 'Brand / GROUNDBREAKERS', latest: 'ブランド詳細ページ（GROUNDBREAKERS）を公開しました。' },
        brandNezs: { path: 'subpages/brand-nezs.html', label: "NEZ's", title: "Brand / NEZ's", latest: 'ブランド詳細ページ（NEZ\'s）を公開しました。' },
        brandAromaCrops: { path: 'subpages/brand-aroma-crops.html', label: 'AROMA CROPS', title: 'Brand / AROMA CROPS', latest: 'ブランド詳細ページ（AROMA CROPS）を公開しました。' },
        brandKosaido: { path: 'subpages/brand-kosaido.html', label: '香彩堂', title: 'Brand / 香彩堂', latest: 'ブランド詳細ページ（香彩堂）を公開しました。' },
        brandWatoyo: { path: 'subpages/brand-watoyo.html', label: 'WATOYO', title: 'Brand / WATOYO', latest: 'WATOYO ブランドページを公開中です。' },
        brandCocktailSoap: { path: 'subpages/brand-cocktail-soap.html', label: 'COCKTAIL SOAP', title: 'Brand / COCKTAIL SOAP', latest: 'ブランド詳細ページ（COCKTAIL SOAP）を公開しました。' },
        brandEnjoyth: { path: 'subpages/brand-enjoyth.html', label: 'ENJOYNTH', title: 'Brand / ENJOYNTH', latest: 'ブランド詳細ページ（ENJOYNTH）を公開しました。' },
        brandAwaji: { path: 'subpages/brand-awaji.html', label: 'AWAJI', title: 'Brand / AWAJI', latest: 'ブランド詳細ページ（AWAJI）を公開しました。' },
        brandOldAroma: { path: 'subpages/brand-old-aroma.html', label: '旧アロマシリーズ', title: 'Brand / 旧アロマシリーズ', latest: 'ブランド詳細ページ（旧アロマシリーズ）を公開しました。' },
        items: { path: 'subpages/items.html', label: 'アイテム', title: 'Items', latest: 'アロマ/ハンドクリームの公開導線を中心に整理したアイテムハブページを公開しました。' },
        itemHomeFragrance: { path: 'subpages/item-home-fragrance.html', label: 'アロマ', title: 'Item / Aroma', latest: 'アロマグループページを公開中です。' },
        itemBodyCare: { path: 'subpages/item-body-care.html', label: 'ハンドクリーム', title: 'Item / Hand Cream', latest: 'ハンドクリームグループページを公開中です。' },
        itemDiy: { path: 'subpages/item-diy.html', label: 'DIY', title: 'Item / DIY', latest: 'アイテム詳細ページ（DIY）を公開しました。' },
        itemSale: { path: 'subpages/item-sale.html', label: 'SALE', title: 'Item / Sale', latest: 'アイテム詳細ページ（SALE）を公開しました。' },
        itemEcology: { path: 'subpages/item-ecology.html', label: 'エコロジー', title: 'Item / Ecology', latest: 'アイテム詳細ページ（エコロジー）を公開しました。' },
        itemRefillTools: { path: 'subpages/item-refill-tools.html', label: '詰め替えツール', title: 'Item / Refill Tools', latest: 'アイテム詳細ページ（詰め替えツール）を公開しました。' },
        itemGiftSet: { path: 'subpages/item-gift-set.html', label: 'ギフトセット', title: 'Item / Gift Set', latest: 'アイテム詳細ページ（ギフトセット）を公開しました。' },
        scentSearch: { path: 'subpages/scent-search.html', label: '香りから探す', title: 'Search by Scent', latest: '香りキーワードとカテゴリから関連ページを探せる検索ハブを公開しました。' },
        searchStoreInfo: { path: 'subpages/search-shop-info.html', label: '実店舗情報', title: 'Search / Shop Info', latest: '浅草・柴又・ソラマチの店舗情報を比較し、地図確認から予約導線へ進めるページを公開しました。' },
        searchProjects: { path: 'subpages/search-projects.html', label: 'プロジェクト・読み物', title: 'Search / Projects', latest: '体験導線・デジタル調香・店舗背景の読み物を目的別に探せるストーリーハブを公開しました。' },
        searchEvents: { path: 'subpages/search-events.html', label: 'イベント情報', title: 'Search / Events', latest: '開催ステータスと対象店舗で絞り込めるイベント一覧ページを公開しました。' },
        workshop: { path: 'subpages/workshop.html', label: '香りと遊ぶ', title: 'Workshop', latest: '香りのワークショップ予約ページを公開しました。デジタル体験から店頭予約まで一続きで案内します。' },
        workshopPlans: { path: 'subpages/workshop-plans.html', label: 'プラン比較', title: 'Workshop / Plans', latest: 'ワークショッププラン比較ページを公開しました。目的や所要時間を比較しながら選べます。' },
        workshopBooking: { path: 'subpages/workshop-booking.html', label: '予約枠選択', title: 'Workshop / Booking', latest: 'ワークショップ予約画面のドラフトを公開しました。空き状況を見ながら日付と時間帯を選べます。' },
        workshopBookingEntry: { path: 'subpages/workshop-booking-entry.html', label: '申込情報入力', title: 'Workshop / Booking Entry', latest: 'ワークショップ予約入力画面のドラフトを公開しました。選択した枠の内容を確認しながら申込情報を整理できます。' },
        workshopBookingConfirm: { path: 'subpages/workshop-booking-confirm.html', label: '予約内容確認', title: 'Workshop / Booking Confirm', latest: 'ワークショップ予約確認画面のドラフトを公開しました。送信前に予約枠と申込情報をまとめて確認できます。' },
        workshopBookingThanks: { path: 'subpages/workshop-booking-thanks.html', label: '予約完了', title: 'Workshop / Booking Thanks', latest: 'ワークショップ予約完了画面を公開しました。次のアクションを選んで継続できます。' },
        smartScent: { path: 'subpages/smart-scent-design.html', label: 'Smart Scent Design', title: 'Smart Scent Design', latest: '色・粒子・サウンドを使って、自分の香りを視覚的に編集するデジタル調香ページです。' },
        article: { path: 'subpages/article.html', label: '記事', title: 'Article', latest: '体験設計・予約導線・店舗背景を短く読める記事ページを公開しました。' },
        sale: { path: 'subpages/sale.html', label: 'セール', title: 'Sale', latest: 'WATOYO / アロマ / ハンドクリームの限定オファーを確認できるセールページを公開しました。' },
        sitemap: { path: 'subpages/sitemap.html', label: 'サイトマップ', title: 'Site Map', latest: 'サイト構造の見直しに向け、公開ページと管理ページの導線一覧を公開しました。' },
        stores: { path: 'subpages/stores.html', label: '実店舗', title: 'Shops', latest: '浅草・柴又・ソラマチの比較導線を備えた実店舗案内ページを公開しました。' },
        account: { path: 'subpages/account.html', label: 'マイアカウント', title: 'My Account', latest: 'ログイン・会員登録・プロフィール設定への入口をまとめたアカウントページを公開しました。' },
        shoppingGuide: { path: 'subpages/shopping-guide.html', label: 'ショッピングガイド', title: 'Shopping Guide', latest: '配送・お支払い・返品ポリシーの要点をまとめたショッピングガイドを公開しました。' },
        legal: { path: 'subpages/legal.html', label: '法的表示', title: 'Legal', latest: '特定商取引法に基づく法的表示ドラフトページを公開しました。' },
        contact: { path: 'subpages/contact.html', label: 'お問い合わせ', title: 'Contact', latest: '予約・商品・法人相談の窓口を整理したお問い合わせページを公開しました。' },
        newsletter: { path: 'subpages/newsletter.html', label: 'メルマガ登録・解除', title: 'Newsletter', latest: 'メルマガ登録・解除の設定案内ページを公開しました。' },
        register: { path: 'subpages/register.html', label: '会員登録', title: 'Register', latest: '会員登録ページを公開しました。モーダル認証導線と連携して利用できます。' },
        login: { path: 'subpages/login.html', label: 'ログイン', title: 'Login', latest: 'ログインページを公開しました。モーダル認証導線と連携して利用できます。' },
        cart: { path: 'subpages/cart.html', label: 'カート', title: 'Cart', latest: 'カート機能の準備状況と商品導線を確認できる案内ページを公開しました。' },
        privacy: { path: 'subpages/privacy.html', label: 'プライバシーポリシー', title: 'Privacy Policy', latest: '個人情報の取扱方針をまとめたプライバシーポリシードラフトを公開しました。' },
        rss: { path: 'subpages/rss.html', label: 'RSS / ATOM', title: 'RSS / ATOM', latest: 'RSS / ATOM 配信方針と公開予定フィードの案内ページを公開しました。' }
        ,
        appLogin: { path: 'app/login.html', label: 'App Login', title: 'App / Login', latest: '管理アプリ画面は現在作成準備中です。' },
        appPasswordForgot: { path: 'app/password/forgot.html', label: 'Forgot Password', title: 'App / Password Forgot', latest: '管理アプリ画面は現在作成準備中です。' },
        appPasswordReset: { path: 'app/password/reset.html', label: 'Reset Password', title: 'App / Password Reset', latest: '管理アプリ画面は現在作成準備中です。' },
        appDashboard: { path: 'app/dashboard.html', label: 'Dashboard', title: 'App / Dashboard', latest: '管理アプリ画面は現在作成準備中です。' },
        appPagesHome: { path: 'app/pages/home.html', label: 'Home Admin', title: 'App / Home Management', latest: '管理アプリ画面は現在作成準備中です。' },
        appPagesWorkshop: { path: 'app/pages/workshop.html', label: 'Workshop Bookings', title: 'App / Workshop Bookings', latest: '管理アプリ画面は現在作成準備中です。' },
        appPublish: { path: 'app/publish.html', label: 'Publish', title: 'App / Publish', latest: '管理アプリ画面は現在作成準備中です。' },
        appUsersMe: { path: 'app/users/me.html', label: 'Account Settings', title: 'App / Account Settings', latest: '管理アプリ画面は現在作成準備中です。' }
    };

    const currentPage = pages[pageKey] || pages.home;
    let currentSession = null;
    let currentUser = null;
    let currentProfile = null;
    let currentRoles = [];
    let currentPreferences = null;
    let authStateReady = false;
    let recoveryFlowActive = initialHashParams.get('type') === 'recovery';
    const siteConfig = window.INIM_SITE_CONFIG || {};
    const rawAdminAccessMode = String(siteConfig.adminAccessMode || 'admin_only').trim().toLowerCase();
    const adminAccessMode = rawAdminAccessMode === 'open_demo' ? 'open_demo' : 'admin_only';
    const showPublicSideNav = siteConfig.enablePublicSideNav === true;
    const supabaseConfig = {
        url: siteConfig.supabaseUrl || '',
        publishableKey: siteConfig.supabasePublishableKey || ''
    };
    const authRedirectUrl = siteConfig.authRedirectUrl || '';
    const hasSupabaseConfig = Boolean(supabaseConfig.url && supabaseConfig.publishableKey);
    const supabaseApi = window.supabase || null;
    const supabase = (() => {
        if (!hasSupabaseConfig || !supabaseApi?.createClient) {
            return null;
        }
        if (window.__INIM_SUPABASE_CLIENT) {
            return window.__INIM_SUPABASE_CLIENT;
        }
        const client = supabaseApi.createClient(supabaseConfig.url, supabaseConfig.publishableKey);
        window.__INIM_SUPABASE_CLIENT = client;
        return client;
    })();
    const modalPageKeys = new Set(["login", "register", "account"]);
    const modalTitles = {
        login: "ログイン",
        register: "新規会員登録",
        forgot: "パスワード再設定",
        account: "マイアカウント",
        profile: "プロファイル編集",
        password: "パスワード変更",
        preferences: "好みの設定",
        delete: "退会手続き"
    };
    const t = {
        login: 'ログイン',
        register: '新規会員登録'
    };


    const link = (key, hash = '') => `${root}/${pages[key].path}${hash}`;
    const breadcrumbChildMap = {
        brand: ["brand", "brandGroundbreakers", "brandNezs", "brandAromaCrops", "brandKosaido", "brandWatoyo", "brandCocktailSoap", "brandEnjoyth", "brandAwaji", "brandOldAroma"],
        items: ["items", "itemHomeFragrance", "itemBodyCare"],
        scentSearch: ["scentSearch", "searchStoreInfo", "searchProjects", "searchEvents"],
        workshop: ["workshop", "workshopPlans", "workshopBooking", "workshopBookingEntry", "workshopBookingConfirm", "workshopBookingThanks", "smartScent"],
        article: ["article"],
        sale: ["sale"],
        stores: ["stores"]
    };
    const breadcrumbRootPages = ["about", "shoppingGuide", "legal", "privacy", "contact", "newsletter", "cart", "sitemap", "rss"];
    const breadcrumbAccountPages = ["account", "login", "register"];
    const resolveBreadcrumbTrail = (key) => {
        if (!key || key === "home") return ["home"];
        if (breadcrumbAccountPages.includes(key)) {
            return key === "account" ? ["home", "account"] : ["home", "account", key];
        }
        for (const parent of Object.keys(breadcrumbChildMap)) {
            if (breadcrumbChildMap[parent].includes(key)) {
                return key === parent ? ["home", parent] : ["home", parent, key];
            }
        }
        if (breadcrumbRootPages.includes(key)) return ["home", key];
        return ["home", key];
    };
    const isCurrent = (key) => key === pageKey ? ' is-current' : '';
    const defaultDisabledPublicPageKeys = [];
    const knownDisabledPolicyKeys = new Set([
        'article', 'sale', 'stores',
        'shoppingGuide', 'legal', 'privacy', 'contact', 'newsletter', 'rss', 'cart',
        'brand', 'items', 'scentSearch'
    ]);
    const hasDisabledConfig = Array.isArray(siteConfig.disabledPublicPageKeys);
    const configDisabledKeys = hasDisabledConfig
        ? siteConfig.disabledPublicPageKeys
            .map((key) => String(key || '').trim())
            .filter((key, index, arr) => key && arr.indexOf(key) === index && knownDisabledPolicyKeys.has(key))
        : [];
    const disabledPublicPageKeys = new Set(hasDisabledConfig ? configDisabledKeys : defaultDisabledPublicPageKeys);
    const globalNavToggleKeys = ['brand', 'items'];
    const disabledGlobalNavKeys = new Set(
        globalNavToggleKeys.filter((key) => disabledPublicPageKeys.has(key))
    );
    const disabledLinkAttrs = `aria-disabled="true" tabindex="-1"`;
    const accountHref = (mode) => `${window.location.pathname}#${mode}`;
    const accountModalLink = (mode, label, className = '') => `<a class="${className}" href="${accountHref(mode)}" data-account-modal="${mode}">${label}</a>`;
    const accountLogoutLink = (className = '') => `<a class="${className}" href="${window.location.pathname}#logout" data-account-logout="true">ログアウト</a>`;
    const isAdminUser = () => currentRoles.includes('admin');

    const sidebarGroups = [
        {
            title: 'ブランド',
            key: 'brand',
            items: ['brandWatoyo']
        },
        {
            title: 'アイテム',
            key: 'items',
            items: ['itemHomeFragrance', 'itemBodyCare']
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
                { label: 'プラン比較', href: link('workshopPlans') },
                { label: '予約する', href: link('workshopBooking') },
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
            title: 'セール',
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
        : (disabledPublicPageKeys.has(item.key)
            ? `<a class="${isCurrent(item.key).trim()} is-disabled" href="#" ${disabledLinkAttrs}>${item.label}</a>`
            : `<a class="${isCurrent(item.key).trim()}" href="${link(item.key)}">${item.label}</a>`);
    const renderPublicPageLink = (key, label, className = '') => {
        const cls = `${className} ${disabledPublicPageKeys.has(key) ? 'is-disabled' : ''}`.trim();
        return disabledPublicPageKeys.has(key)
            ? `<a class="${cls}" href="#" ${disabledLinkAttrs}>${label}</a>`
            : `<a class="${cls}" href="${link(key)}">${label}</a>`;
    };
    const renderDisabledTextLink = (label) => `<a class="is-disabled" href="#" ${disabledLinkAttrs}>${label}</a>`;
    const sidebarGroupMap = Object.fromEntries(sidebarGroups.map((group) => [group.key, group]));
    const buildGlobalChildren = (groupKey) => {
        const group = sidebarGroupMap[groupKey];
        if (!group || !Array.isArray(group.items)) return [];
        return group.items.map((item) => {
            if (typeof item === 'string') {
                return {
                    key: item,
                    label: pages[item]?.label || item,
                    href: link(item),
                    current: pageKey === item
                };
            }
            return {
                key: '',
                label: item.label,
                href: item.href,
                current: false
            };
        });
    };
    const breadcrumbHref = (key) => {
        if (key === 'home') return link('home');
        if (key === 'login') return accountHref('login');
        if (key === 'register') return accountHref('register');
        if (key === 'account') return accountHref('account');
        return pages[key] ? link(key) : '#';
    };
    const renderBreadcrumb = () => {
        const trail = resolveBreadcrumbTrail(pageKey);
        if (!trail.length || (trail.length === 1 && trail[0] === 'home')) return '';
        return `
        <nav class="page-breadcrumb" aria-label="breadcrumb">
            <ol>
                ${trail.map((key, index) => {
                    const isLast = index === trail.length - 1;
                    const label = pages[key]?.label || key;
                    if (isLast) return `<li><span aria-current="page">${label}</span></li>`;
                    return `<li><a href="${breadcrumbHref(key)}">${label}</a></li>`;
                }).join("")}
            </ol>
        </nav>`;
    };
    const globalNavItems = [
        {
            key: 'home',
            label: 'Home',
            href: link('home'),
            current: pageKey === 'home',
            children: [
                { key: 'home-about', label: 'About', href: link('about'), current: pageKey === 'about' }
            ]
        },
        {
            key: 'workshop',
            label: '香りと遊ぶ',
            href: link('workshop'),
            current: ['workshop', 'workshopPlans', 'workshopBooking', 'workshopBookingEntry', 'workshopBookingConfirm', 'workshopBookingThanks', 'smartScent'].includes(pageKey),
            children: buildGlobalChildren('workshop')
        },
        {
            key: 'brand',
            label: 'ブランド',
            href: link('brand'),
            current: ['brand', 'brandGroundbreakers', 'brandNezs', 'brandAromaCrops', 'brandKosaido', 'brandWatoyo', 'brandCocktailSoap', 'brandEnjoyth', 'brandAwaji', 'brandOldAroma'].includes(pageKey),
            children: buildGlobalChildren('brand')
        },
        {
            key: 'items',
            label: 'アイテム',
            href: link('items'),
            current: ['items', 'itemHomeFragrance', 'itemBodyCare', 'itemDiy', 'itemSale', 'itemEcology', 'itemRefillTools', 'itemGiftSet'].includes(pageKey),
            children: buildGlobalChildren('items')
        },
        {
            key: 'searchProjects',
            label: '記事',
            href: link('searchProjects'),
            current: ['searchProjects', 'article'].includes(pageKey),
            children: []
        },
        {
            key: 'searchEvents',
            label: 'イベント',
            href: link('searchEvents'),
            current: pageKey === 'searchEvents',
            children: []
        },
        {
            key: 'searchStoreInfo',
            label: '実店舗',
            href: link('searchStoreInfo'),
            current: ['searchStoreInfo', 'stores'].includes(pageKey),
            children: []
        }
    ];
    const renderGlobalNav = () => `
        <nav class="category-nav" aria-label="グローバルナビゲーション">
            ${globalNavItems.map((item) => {
                const isDisabled = disabledGlobalNavKeys.has(item.key);
                const hasChildren = !isDisabled && item.children.length > 0;
                const parentOnly = item.parentOnly === true;
                const linkClass = `${item.current ? 'is-current' : ''} ${isDisabled ? 'is-disabled' : ''}`.trim();
                const linkOrLabel = parentOnly
                    ? `<span class="category-nav__label ${linkClass}">${item.label}</span>`
                    : `<a class="${linkClass}" href="${isDisabled ? '#' : item.href}" ${isDisabled ? disabledLinkAttrs : ''}>${item.label}</a>`;
                return `
                    <div class="category-nav__item ${hasChildren ? 'has-children' : ''} ${item.current ? 'is-current' : ''}">
                        ${linkOrLabel}
                        ${hasChildren ? `<button type="button" class="category-nav__toggle" aria-expanded="false" aria-label="${item.label} submenu"></button>
                        <div class="category-nav__dropdown" role="menu">
                            ${item.children.map((child) => `<a class="${child.current ? 'is-current' : ''}" href="${child.href}" role="menuitem">${child.label}</a>`).join('')}
                        </div>` : ''}
                    </div>
                `;
            }).join('')}
        </nav>
    `;

    const openGroups = new Set();
    const currentTopLevel = {
        about: null,
        brand: 'brand',
        brandGroundbreakers: 'brand',
        brandNezs: 'brand',
        brandAromaCrops: 'brand',
        brandKosaido: 'brand',
        brandWatoyo: 'brand',
        brandCocktailSoap: 'brand',
        brandEnjoyth: 'brand',
        brandAwaji: 'brand',
        brandOldAroma: 'brand',
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
        workshopPlans: 'workshop',
        workshopBooking: 'workshop',
        workshopBookingEntry: 'workshop',
        workshopBookingConfirm: 'workshop',
        workshopBookingThanks: 'workshop',
        smartScent: 'workshop',
        article: 'article',
        sale: 'sale',
        sitemap: null,
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
        <div class="utility-header">
            <a class="utility-header__brand-logo" href="${link('home')}" aria-label="inim-dx top">
                <img src="${root}/images/logo/logo-inim-dx.jpg" alt="inim-dx logo">
            </a>
            <div class="utility-header__tools">
                ${accountModalLink('login', 'ログイン')}
                ${accountModalLink('register', '会員登録')}
            </div>
        </div>
        ${renderGlobalNav()}
        ${renderBreadcrumb()}
        <div class="news-strip">
            <span>Latest</span>
            <p>${currentPage.latest}</p>
        </div>
    `;

    const footerHtml = `
        <div class="site-footer__grid" id="footer-links">
            <div>
                <p class="site-footer__title">Shop Info</p>
                <p>inim-dx flagship atelier<br>Fragrance workshop and consultation by reservation.</p>
            </div>
            <div>
                <p class="site-footer__title">Guide</p>
                ${renderPublicPageLink('sitemap', 'サイトマップ')}
                ${renderPublicPageLink('shoppingGuide', 'ショッピングガイド')}
                ${renderPublicPageLink('legal', '法的表示')}
            </div>
            <div>
                <p class="site-footer__title">Support</p>
                ${renderPublicPageLink('privacy', 'プライバシーポリシー')}
                ${renderPublicPageLink('newsletter', 'メルマガ登録・解除')}
                ${renderPublicPageLink('rss', 'RSS / ATOM')}
            </div>
            <div>
                <p class="site-footer__title">Account</p>
                ${accountModalLink('account', 'マイアカウント')}
                ${accountModalLink('register', '会員登録')}
                ${accountModalLink('login', 'ログイン')}
                ${renderPublicPageLink('contact', 'お問い合わせ')}
            </div>
        </div>
        <p class="site-footer__copy">&copy; 2026 inim-dx. All rights reserved.</p>
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

    const shell = document.createElement('div');
    shell.className = 'page-shell';

    let hamburger = null;
    let sidebar = null;
    if (showPublicSideNav) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.type = 'button';
        hamburger.setAttribute('aria-label', 'メニューを開く');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'sidebar');
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.id = 'sidebar';
        sidebar.innerHTML = sidebarHtml;
    }

    const pageContent = document.createElement('div');
    pageContent.className = 'page-content';

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = headerHtml;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.id = 'contact';
    footer.innerHTML = footerHtml;
    body.classList.toggle('public-nav--no-side', !showPublicSideNav);

    const renderHeaderTools = () => {
        const tools = header.querySelector('.utility-header__tools');
        if (!tools) { return; }
        tools.innerHTML = currentUser
            ? `${accountModalLink('account', 'マイアカウント')}${accountLogoutLink()}`
            : `${accountModalLink('login', 'ログイン')}${accountModalLink('register', '会員登録')}`;
    };

    const renderSidebarAccountLinks = () => {
        if (!showPublicSideNav || !sidebar) { return; }
        const standalone = sidebar.querySelector('.sidebar__standalone');
        if (!standalone) { return; }
        standalone.innerHTML = currentUser
            ? `${renderPublicPageLink('shoppingGuide', 'ショッピングガイド', isCurrent('shoppingGuide').trim())}${accountModalLink('account', 'マイアカウント')}${accountLogoutLink()}`
            : `${renderPublicPageLink('shoppingGuide', 'ショッピングガイド', isCurrent('shoppingGuide').trim())}${accountModalLink('register', '会員登録')}${accountModalLink('login', 'ログイン')}`;
    };

    const renderFooterAccountLinks = () => {
        const accountColumn = footer.querySelector('.site-footer__grid > div:last-child');
        if (!accountColumn) { return; }
        accountColumn.innerHTML = currentUser
            ? `<p class="site-footer__title">Account</p>${accountModalLink('account', 'マイアカウント')}${accountLogoutLink()}${renderPublicPageLink('contact', 'お問い合わせ')}`
            : `<p class="site-footer__title">Account</p>${accountModalLink('register', '会員登録')}${accountModalLink('login', 'ログイン')}${renderPublicPageLink('contact', 'お問い合わせ')}`;
    };

    const renderAdminLinks = () => {
        const show = adminAccessMode === 'open_demo' ? true : isAdminUser();
        const isAdminPage = String(pageKey || '').startsWith('app');

        const globalNav = header.querySelector('.category-nav');
        if (globalNav) {
            let item = globalNav.querySelector('[data-admin-link="global"]');
            if (show && !item) {
                item = document.createElement('div');
                item.className = 'category-nav__item';
                item.dataset.adminLink = 'global';
                item.innerHTML = `<a href="${link('appDashboard')}">Admin</a>`;
                globalNav.appendChild(item);
            }
            if (!show && item) {
                item.remove();
                item = null;
            }
            if (item) {
                item.classList.toggle('is-current', isAdminPage);
                const linkNode = item.querySelector('a');
                if (linkNode) {
                    linkNode.classList.toggle('is-current', isAdminPage);
                }
            }
            syncGlobalNavA11y();
        }

        const standalone = showPublicSideNav && sidebar
            ? sidebar.querySelector('.sidebar__standalone')
            : null;
        if (showPublicSideNav && sidebar && standalone) {
            const ensureSideLink = (key, label) => {
                const selector = `[data-admin-link="${key}"]`;
                let item = standalone.querySelector(selector);
                if (show && !item) {
                    item = document.createElement('a');
                    item.href = key === 'sidebar-dashboard' ? link('appDashboard') : link('appPagesWorkshop');
                    item.dataset.adminLink = key;
                    item.textContent = label;
                    standalone.appendChild(item);
                }
                if (!show && item) {
                    item.remove();
                }
            };
            ensureSideLink('sidebar-dashboard', '管理ダッシュボード');
            ensureSideLink('sidebar-bookings', '予約管理');
        }

        const accountColumn = footer.querySelector('.site-footer__grid > div:last-child');
        if (accountColumn) {
            const ensureFooterLink = (key, label) => {
                const selector = `[data-admin-link="${key}"]`;
                let item = accountColumn.querySelector(selector);
                if (show && !item) {
                    item = document.createElement('a');
                    item.href = key === 'footer-dashboard' ? link('appDashboard') : link('appPagesWorkshop');
                    item.dataset.adminLink = key;
                    item.textContent = label;
                    accountColumn.appendChild(item);
                }
                if (!show && item) {
                    item.remove();
                }
            };
            ensureFooterLink('footer-dashboard', '管理ダッシュボード');
            ensureFooterLink('footer-bookings', '予約管理');
        }
    };

    const syncAuthUi = () => {
        renderHeaderTools();
        renderSidebarAccountLinks();
        renderFooterAccountLinks();
        renderAdminLinks();
    };

    const hasPendingAuthHash = () => ['access_token', 'refresh_token', 'type', 'error', 'error_code', 'error_description']
        .some((key) => initialHashParams.has(key));

    const getRequestedModalMode = () => {
        const authType = initialHashParams.get('type');
        if (authType === 'recovery') {
            return 'password';
        }
        if (authType === 'signup') {
            return 'account';
        }
        if (initialHashParams.get('error')) {
            return 'login';
        }

        const requestedMode = window.location.hash.replace('#', '');
        return modalTitles[requestedMode] ? requestedMode : pageKey;
    };

    const syncModalLanding = () => {
        if (!modalPageKeys.has(pageKey)) {
            return;
        }

        if (!authStateReady && hasPendingAuthHash()) {
            return;
        }

        const requestedMode = getRequestedModalMode();
        if (pageKey === 'account') {
            if (!currentUser) {
                openModal(requestedMode === 'register' ? 'register' : 'login');
                return;
            }

            const accountMode = ['profile', 'preferences', 'password', 'delete'].includes(requestedMode) ? requestedMode : 'account';
            openModal(accountMode);
            return;
        }

        openModal(requestedMode);
    };

    const loadOwnProfile = async () => {
        if (!supabase || !currentUser) {
            currentProfile = null;
            currentPreferences = null;
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, display_name, email, status, favorite_store, created_at, deleted_at')
            .eq('id', currentUser.id)
            .maybeSingle();

        if (error || !data) {
            currentProfile = null;
            return;
        }

        if (data.deleted_at || data.status === 'inactive') {
            currentProfile = data;
            currentPreferences = null;
            modalFlashStatus = {
                mode: 'login',
                message: '退会済みアカウントのためログインできません。必要な場合はお問い合わせください。',
                type: 'error'
            };
            await supabase.auth.signOut();
            return;
        }

        currentProfile = data;
        if (modal.getAttribute('aria-hidden') === 'false' && ['account', 'profile'].includes(modal.dataset.mode)) {
            openModal(modal.dataset.mode);
        }
    };

    const loadOwnPreferences = async () => {
        if (!supabase || !currentUser) {
            currentPreferences = null;
            return;
        }

        const { data, error } = await supabase
            .from('customer_preferences')
            .select('profile_id, preferred_scent_family, preferred_experience, notes')
            .eq('profile_id', currentUser.id)
            .maybeSingle();

        if (error || !data) {
            currentPreferences = null;
            return;
        }

        currentPreferences = data;
        if (modal.getAttribute('aria-hidden') === 'false' && modal.dataset.mode === 'account') {
            openModal('account');
        }
    };

    const loadAdminRoles = async () => {
        if (!supabase || !currentUser) {
            currentRoles = [];
            syncAuthUi();
            return;
        }

        try {
            const { data: userProfile, error: profileError } = await supabase
                .from('user_profiles')
                .select('id')
                .eq('auth_user_id', currentUser.id)
                .maybeSingle();
            if (profileError || !userProfile?.id) {
                currentRoles = [];
                syncAuthUi();
                return;
            }

            const { data: roleRows, error: roleError } = await supabase
                .from('user_role_assignments')
                .select('roles(role_code)')
                .eq('user_profile_id', userProfile.id);
            if (roleError) {
                currentRoles = [];
                syncAuthUi();
                return;
            }

            currentRoles = (roleRows || [])
                .map((row) => String(row?.roles?.role_code || '').trim().toLowerCase())
                .filter(Boolean);
            syncAuthUi();
        } catch (_e) {
            currentRoles = [];
            syncAuthUi();
        }
    };

    const applyAuthSession = (session) => {
        currentSession = session;
        currentUser = session?.user || null;
        if (!currentUser) {
            currentProfile = null;
            currentRoles = [];
            currentPreferences = null;
        } else {
            void loadOwnProfile();
            void loadAdminRoles();
            void loadOwnPreferences();
        }
        syncAuthUi();
        syncModalLanding();
    };

    const initAuthState = async () => {
        syncAuthUi();
        if (!supabase) {
            authStateReady = true;
            syncModalLanding();
            return;
        }
        const { data, error } = await supabase.auth.getSession();
        authStateReady = true;
        if (!error) {
            applyAuthSession(data.session);
        } else {
            syncModalLanding();
        }
        supabase.auth.onAuthStateChange((_event, session) => {
            authStateReady = true;
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

    const syncGlobalNavA11y = () => {
        const nav = header.querySelector('.category-nav');
        if (!nav) return;
        nav.querySelectorAll('a').forEach((anchor) => {
            if (anchor.classList.contains('is-current')) {
                anchor.setAttribute('aria-current', 'page');
            } else {
                anchor.removeAttribute('aria-current');
            }
        });
    };
    const initGlobalNavDrilldown = () => {
        const nav = header.querySelector('.category-nav');
        if (!nav) return;
        const items = nav.querySelectorAll('.category-nav__item.has-children');
        const closeAll = () => {
            items.forEach((item) => {
                item.classList.remove('is-open');
                const toggle = item.querySelector('.category-nav__toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        };
        items.forEach((item) => {
            const toggle = item.querySelector('.category-nav__toggle');
            if (!toggle) return;
            toggle.addEventListener('click', (event) => {
                event.preventDefault();
                const willOpen = !item.classList.contains('is-open');
                closeAll();
                if (willOpen) {
                    item.classList.add('is-open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
        });
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (!nav.contains(target)) closeAll();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeAll();
        });
        nav.querySelectorAll('.category-nav__dropdown a').forEach((linkNode) => {
            linkNode.addEventListener('click', () => closeAll());
        });
    };

    pageContent.appendChild(header);
    pageContent.appendChild(main);
    pageContent.appendChild(footer);
    if (showPublicSideNav && sidebar) {
        shell.appendChild(sidebar);
    }
    shell.appendChild(pageContent);

    if (showPublicSideNav && hamburger) {
        body.prepend(hamburger);
    }
    body.appendChild(shell);
    body.appendChild(modalHost.firstElementChild);
    syncGlobalNavA11y();
    initGlobalNavDrilldown();

    const modal = document.getElementById('account-modal');
    const modalTitle = document.getElementById('account-modal-title');
    const modalLead = document.getElementById('account-modal-lead');
    const modalBody = document.getElementById('account-modal-body');
    let previousFocus = null;
    let modalFlashStatus = null;

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
        store: '未設定',
        joinedAt: '2026-03-12'
    };

    const toDateLabel = (value) => value ? String(value).split('T')[0] : accountSample.joinedAt;
    const toStatusLabel = (value) => ({ active: '有効', inactive: '停止', pending: '確認待ち' }[value] || value || accountSample.status);
    const getAccountViewModel = () => {
        const metadata = currentUser?.user_metadata || {};
        return {
            name: currentProfile?.full_name || metadata.name || accountSample.name,
            displayName: currentProfile?.display_name || metadata.display_name || accountSample.displayName,
            email: currentProfile?.email || currentUser?.email || accountSample.email,
            status: toStatusLabel(currentProfile?.status),
            store: currentProfile?.favorite_store || accountSample.store,
            joinedAt: toDateLabel(currentProfile?.created_at || currentUser?.created_at)
        };
    };

    const getPreferencesSummaryItems = () => {
        if (!currentPreferences) {
            return [];
        }

        return [
            ['好みの香調', currentPreferences.preferred_scent_family],
            ['希望する体験', currentPreferences.preferred_experience],
            ['メモ', currentPreferences.notes]
        ].filter(([, value]) => Boolean(value));
    };

    const renderPreferencesSummary = () => {
        const items = getPreferencesSummaryItems();
        if (!items.length) {
            return '<div><span>今後の機能</span><strong>予約履歴 / 調香履歴 / お気に入り</strong></div>';
        }

        return items.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('');
    };

    const consumeModalFlashStatus = (mode) => {
        if (!modalFlashStatus || modalFlashStatus.mode !== mode) {
            return '';
        }

        const flash = modalFlashStatus;
        modalFlashStatus = null;
        return `<p class="account-form__status" data-state="${flash.type}" role="status" aria-live="polite">${flash.message}</p>`;
    };

    const modalLeads = {
        login: 'ご登録済みのお客様はこちらからログインしてください。今後、予約情報や調香履歴もここに連携されます。',
        register: '予約情報やお好みデータを管理する会員アカウントを作成します。',
        forgot: 'ご登録メールアドレス宛に、パスワード再設定用のメールを送信します。',
        account: 'お客様向けのアカウント画面です。今後、予約状況やお気に入り情報もここに集約します。',
        profile: 'お名前・表示名・メールアドレスを編集できます。',
        password: '現在のパスワードを確認しながら、安全に変更します。',
        preferences: '香りの好みや体験の希望を記録して、今後の提案に活かします。',
        delete: '退会には再認証と最終確認が必要です。'
    };

    const fieldErrorHtml = (name) => `<p class="account-error-text" data-field-error="${name}" hidden></p>`;
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const renderAccountView = (mode) => {
        const accountViewModel = getAccountViewModel();
        if (mode === 'login') {
            return `${consumeModalFlashStatus('login')}<form class="account-form" novalidate><label class="account-field"><span>メールアドレス</span><input type="email" name="email" placeholder="you@example.com" autocomplete="email"></label>${fieldErrorHtml('email')}<label class="account-field"><span>パスワード</span><input type="password" name="password" placeholder="8文字以上" autocomplete="current-password"></label>${fieldErrorHtml('password')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><label class="account-check"><input type="checkbox" name="remember"><span>ログイン状態を保持する</span></label><div class="account-form__actions"><button class="button" type="submit">${t.login}</button></div><div class="account-inline-links"><a href="#forgot" data-account-switch="forgot">パスワードをお忘れですか？</a><a href="#register" data-account-switch="register">${t.register}</a></div></form>`;
        }
        if (mode === 'register') {
            return `<form class="account-form" novalidate><label class="account-field"><span>お名前</span><input type="text" name="name" placeholder="${accountViewModel.name}" autocomplete="name"></label>${fieldErrorHtml('name')}<label class="account-field"><span>表示名</span><input type="text" name="display_name" placeholder="${accountViewModel.displayName}" autocomplete="nickname"></label>${fieldErrorHtml('display_name')}<label class="account-field"><span>メールアドレス</span><input type="email" name="email" placeholder="you@example.com" autocomplete="email"></label>${fieldErrorHtml('email')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__split"><div><label class="account-field"><span>パスワード</span><input type="password" name="password" placeholder="8文字以上" autocomplete="new-password"></label>${fieldErrorHtml('password')}</div><div><label class="account-field"><span>パスワード確認</span><input type="password" name="password_confirm" placeholder="もう一度入力" autocomplete="new-password"></label>${fieldErrorHtml('password_confirm')}</div></div><label class="account-check"><input type="checkbox" name="terms"><span>利用規約とプライバシーポリシーに同意します。</span></label>${fieldErrorHtml('terms')}<div class="account-form__actions"><button class="button" type="submit">${t.register}</button></div><div class="account-inline-links"><a href="#login" data-account-switch="login">${t.login}</a></div></form>`;
        }
        if (mode === 'forgot') {
            return `<form class="account-form" novalidate><label class="account-field"><span>ご登録メールアドレス</span><input type="email" name="email" placeholder="you@example.com" autocomplete="email"></label>${fieldErrorHtml('email')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__actions"><button class="button" type="submit">再設定メールを送信</button></div><div class="account-inline-links"><a href="#login" data-account-switch="login">${t.login}</a></div></form>`;
        }
        if (mode === 'profile') {
            return `<form class="account-form" novalidate><div class="account-summary"><div><span>登録日</span><strong>${accountViewModel.joinedAt}</strong></div><div><span>状態</span><strong>${accountViewModel.status}</strong></div></div><label class="account-field"><span>お名前</span><input type="text" name="name" value="${accountViewModel.name}"></label>${fieldErrorHtml('name')}<label class="account-field"><span>表示名</span><input type="text" name="display_name" value="${accountViewModel.displayName}"></label>${fieldErrorHtml('display_name')}<label class="account-field"><span>メールアドレス</span><input type="email" name="email" value="${accountViewModel.email}"></label>${fieldErrorHtml('email')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__actions"><button class="button" type="submit">保存</button><a class="button button--ghost" href="#account" data-account-switch="account">戻る</a></div></form>`;
        }
        if (mode === 'preferences') {
            return `<form class="account-form" novalidate><label class="account-field"><span>好みの香調</span><input type="text" name="preferred_scent_family" value="${currentPreferences?.preferred_scent_family || ''}" placeholder="例: citrus / woody / floral"></label><label class="account-field"><span>希望する体験</span><input type="text" name="preferred_experience" value="${currentPreferences?.preferred_experience || ''}" placeholder="例: workshop / custom blend"></label><label class="account-field"><span>メモ</span><input type="text" name="notes" value="${currentPreferences?.notes || ''}" placeholder="ご希望があれば記入"></label><p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__actions"><button class="button" type="submit">保存</button><a class="button button--ghost" href="#account" data-account-switch="account">戻る</a></div></form>`;
        }
        if (mode === 'password') {
            return `<form class="account-form" novalidate>${recoveryFlowActive ? '<p class="account-form__status" data-state="info" role="status" aria-live="polite">再設定メールから遷移しました。新しいパスワードを設定してください。</p>' : `<label class="account-field"><span>現在のパスワード</span><input type="password" name="current_password" placeholder="現在のパスワード"></label>${fieldErrorHtml('current_password')}`}<label class="account-field"><span>新しいパスワード</span><input type="password" name="next_password" placeholder="8文字以上"></label>${fieldErrorHtml('next_password')}<label class="account-field"><span>新しいパスワード確認</span><input type="password" name="next_password_confirm" placeholder="もう一度入力"></label>${fieldErrorHtml('next_password_confirm')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__actions"><button class="button" type="submit">更新</button><a class="button button--ghost" href="#account" data-account-switch="account">戻る</a></div></form>`;
        }
        if (mode === 'delete') {
            return `<div class="account-danger"><p>退会には再認証が必要です。実装段階では、即時削除ではなく soft delete で無効化します。</p><form class="account-form" novalidate><label class="account-field"><span>確認用パスワード</span><input type="password" name="confirm_password" placeholder="現在のパスワード"></label>${fieldErrorHtml('confirm_password')}<p class="account-form__status" data-account-status role="status" aria-live="polite" hidden></p><div class="account-form__actions"><button class="button button--danger" type="submit">退会する</button><a class="button button--ghost" href="#account" data-account-switch="account">キャンセル</a></div></form></div>`;
        }
        return `${consumeModalFlashStatus('account')}<div class="account-card-grid"><article class="account-card account-card--accent"><p class="account-card__label">状態</p><strong>${accountViewModel.status}</strong><span>認証連携済み</span></article><article class="account-card"><p class="account-card__label">よく利用する店舗</p><strong>${accountViewModel.store}</strong><span>予約導線と連携予定</span></article></div><div class="account-summary account-summary--stack"><div><span>お名前</span><strong>${accountViewModel.name}</strong></div><div><span>表示名</span><strong>${accountViewModel.displayName}</strong></div><div><span>メールアドレス</span><strong>${accountViewModel.email}</strong></div>${renderPreferencesSummary()}</div><div class="account-panel-actions"><a class="button" href="#profile" data-account-switch="profile">プロファイル編集</a><a class="button button--secondary" href="#preferences" data-account-switch="preferences">好みの設定</a><a class="button button--secondary" href="#password" data-account-switch="password">パスワード変更</a><a class="button button--ghost" href="#delete" data-account-switch="delete">退会手続き</a></div>`;
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

        if (mode === 'password') {
            if (!recoveryFlowActive && name === 'current_password' && !value) {
                message = '現在のパスワードを入力してください。';
            }
            if (name === 'next_password') {
                if (!value) {
                    message = '新しいパスワードを入力してください。';
                } else if (String(value).length < 8) {
                    message = '新しいパスワードは8文字以上で入力してください。';
                }
            }
            if (name === 'next_password_confirm') {
                const nextPassword = form.elements.next_password?.value || '';
                if (!value) {
                    message = '確認用の新しいパスワードを入力してください。';
                } else if (String(value) !== nextPassword) {
                    message = '新しいパスワードが一致していません。';
                }
            }
        }

        if (mode === 'delete' && name === 'confirm_password' && !value) {
            message = '確認用パスワードを入力してください。';
        }

        if (mode === 'register' || mode === 'profile') {
            if (name === 'name' && !value) {
                message = 'お名前を入力してください。';
            }
            if (name === 'display_name' && !value) {
                message = '表示名を入力してください。';
            }
            if (mode === 'register' && name === 'password') {
                if (!value) {
                    message = 'パスワードを入力してください。';
                } else if (String(value).length < 8) {
                    message = 'パスワードは8文字以上で入力してください。';
                }
            }
            if (mode === 'register' && name === 'password_confirm') {
                const password = form.elements.password?.value || '';
                if (!value) {
                    message = '確認用パスワードを入力してください。';
                } else if (String(value) !== password) {
                    message = 'パスワードが一致していません。';
                }
            }
            if (mode === 'register' && name === 'terms' && !value) {
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
            register: ['name', 'display_name', 'email', 'password', 'password_confirm', 'terms'],
            profile: ['name', 'display_name', 'email'],
            password: recoveryFlowActive ? ['next_password', 'next_password_confirm'] : ['current_password', 'next_password', 'next_password_confirm'],
            preferences: [],
            delete: ['confirm_password']
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

        const isFloating = window.scrollY > navTop;
        globalNav.classList.toggle('is-floating', isFloating);
        globalNav.classList.toggle('is-compact', isFloating && window.scrollY > (navTop + 80));
    };

    if (showPublicSideNav && hamburger && sidebar) {
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
    }

    body.addEventListener('click', (event) => {
        const disabledLink = event.target.closest('a[aria-disabled="true"]');
        if (disabledLink) {
            event.preventDefault();
            return;
        }

        const logoutTrigger = event.target.closest('[data-account-logout]');
        if (logoutTrigger) {
            event.preventDefault();
            if (supabase) {
                void (async () => {
                    await supabase.auth.signOut();
                    if (modalPageKeys.has(pageKey)) {
                        syncModalLanding();
                        return;
                    }
                    closeModal();
                })();
                return;
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
        if (!field || !['login', 'forgot', 'register', 'profile', 'password', 'preferences', 'delete'].includes(mode)) {
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
        if (!field || !['login', 'forgot', 'register', 'profile', 'password', 'preferences', 'delete'].includes(mode) || field.type === 'checkbox') {
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
        if (!field || !['login', 'forgot', 'register', 'profile', 'password', 'preferences', 'delete'].includes(mode)) {
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
        if (!form || !['login', 'forgot', 'register', 'profile', 'password', 'preferences', 'delete'].includes(mode)) {
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

            if (mode === 'password') {
                const nextPassword = form.elements.next_password?.value || '';
                if (!currentUser?.email) {
                    throw new Error('現在のユーザー情報を確認できませんでした。');
                }
                setModalStatus('パスワードを更新しています...', 'info');

                if (!recoveryFlowActive) {
                    const currentPassword = form.elements.current_password?.value || '';
                    const { error: signInError } = await supabase.auth.signInWithPassword({
                        email: currentUser.email,
                        password: currentPassword
                    });
                    if (signInError) {
                        throw signInError;
                    }
                }

                const { error: updateError } = await supabase.auth.updateUser({ password: nextPassword });
                if (updateError) {
                    throw updateError;
                }
                recoveryFlowActive = false;
                modalFlashStatus = { mode: 'account', message: 'パスワードを更新しました。', type: 'success' };
                openModal('account');
                return;
            }

            if (mode === 'profile') {
                const fullName = form.elements.name?.value?.trim() || '';
                const displayName = form.elements.display_name?.value?.trim() || '';
                setModalStatus('プロファイルを保存しています...', 'info');
                const { data, error } = await supabase
                    .from('profiles')
                    .update({
                        full_name: fullName,
                        display_name: displayName,
                        email
                    })
                    .eq('id', currentUser?.id)
                    .select('id, full_name, display_name, email, status, favorite_store, created_at, deleted_at')
                    .maybeSingle();
                if (error) {
                    throw error;
                }
                currentProfile = data || currentProfile;
                modalFlashStatus = { mode: 'account', message: 'プロファイルを保存しました。', type: 'success' };
                openModal('account');
                return;
            }

            if (mode === 'delete') {
                const confirmPassword = form.elements.confirm_password?.value || '';
                if (!currentUser?.email) {
                    throw new Error('現在のユーザー情報を確認できませんでした。');
                }
                setModalStatus('退会処理を進めています...', 'info');
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: currentUser.email,
                    password: confirmPassword
                });
                if (signInError) {
                    throw signInError;
                }
                const { error: deleteError } = await supabase
                    .from('profiles')
                    .update({ deleted_at: new Date().toISOString(), status: 'inactive' })
                    .eq('id', currentUser.id);
                if (deleteError) {
                    throw deleteError;
                }
                currentProfile = null;
                currentPreferences = null;
                await supabase.auth.signOut();
                if (modalPageKeys.has(pageKey)) {
                    syncModalLanding();
                    return;
                }
                closeModal();
                return;
            }

            if (mode === 'preferences') {
                setModalStatus('好みの設定を保存しています...', 'info');
                const payload = {
                    profile_id: currentUser?.id,
                    preferred_scent_family: form.elements.preferred_scent_family?.value?.trim() || null,
                    preferred_experience: form.elements.preferred_experience?.value?.trim() || null,
                    notes: form.elements.notes?.value?.trim() || null
                };
                const { data, error } = await supabase
                    .from('customer_preferences')
                    .upsert(payload, { onConflict: 'profile_id' })
                    .select('profile_id, preferred_scent_family, preferred_experience, notes')
                    .maybeSingle();
                if (error) {
                    throw error;
                }
                currentPreferences = data || payload;
                modalFlashStatus = { mode: 'account', message: '好みの設定を保存しました。', type: 'success' };
                openModal('account');
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

    syncModalLanding();

    document.dispatchEvent(new CustomEvent('site-shell:ready', { detail: { pageKey, root } }));
})();

