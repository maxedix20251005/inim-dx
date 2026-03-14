(() => {
    const body = document.body;
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
        brandOldAroma: { path: 'subpages/brand-old-aroma.html', label: '旧アロマシリーズ', title: 'Brand / 旧アロマシリーズ', latest: 'ブランド詳細ページは現在作成準備中です。' },
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

    const link = (key, hash = '') => `${root}/${pages[key].path}${hash}`;
    const isCurrent = (key) => key === pageKey ? ' is-current' : '';

    const sidebarGroups = [
        {
            title: 'ブランド',
            key: 'brand',
            items: ['brandGroundbreakers', 'brandNezs', 'brandAromaCrops', 'brandKosaido', 'brandWatoyo', 'brandCocktailSoap', 'brandEnjoyth', 'brandAwaji', 'brandOldAroma']
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
        { key: 'account', label: 'マイアカウント' },
        { key: 'register', label: '会員登録' },
        { key: 'login', label: 'ログイン' }
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
                ${standaloneLinks.map((item) => `<a class="${isCurrent(item.key).trim()}" href="${link(item.key)}">${item.label}</a>`).join('')}
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
                <a href="${link('account')}">マイアカウント</a>
                <a href="${link('cart')}">カート</a>
            </div>
        </div>
        <nav class="category-nav" aria-label="グローバルナビゲーション">
            <a class="${isCurrent('home').trim()}" href="${link('home')}">Home</a>
            <a class="${['about', 'brand', 'brandGroundbreakers', 'brandNezs', 'brandAromaCrops', 'brandKosaido', 'brandWatoyo', 'brandCocktailSoap', 'brandEnjoyth', 'brandAwaji', 'brandOldAroma'].includes(pageKey) ? 'is-current' : ''}" href="${link('brand')}">ブランド</a>
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
                <a href="${link('account')}">マイアカウント</a>
                <a href="${link('register')}">会員登録</a>
                <a href="${link('login')}">ログイン</a>
                <a href="${link('contact')}">お問い合わせ</a>
            </div>
        </div>
        <p class="site-footer__copy">inim-dx pages aligned to the sitemap, wireframe, and design guide.</p>
    `;

    const main = document.getElementById('page-main');
    if (!main) {
        return;
    }

    if (!main.innerHTML.trim()) {
        main.innerHTML = `
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
                        <p>このページは現在作成準備中です。サイト構造と導線は整えた上で、コンテンツを順次反映していきます。</p>
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

    pageContent.appendChild(header);
    pageContent.appendChild(main);
    pageContent.appendChild(footer);
    shell.appendChild(sidebar);
    shell.appendChild(pageContent);

    body.prepend(hamburger);
    body.appendChild(shell);

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

    updateFloatingNav();
    window.addEventListener('scroll', updateFloatingNav, { passive: true });
    window.addEventListener('resize', () => {
        const globalNav = document.querySelector('.category-nav');
        if (globalNav) {
            delete globalNav.dataset.initialTop;
        }
        updateFloatingNav();
    });

    document.dispatchEvent(new CustomEvent('site-shell:ready', { detail: { pageKey, root } }));
})();
