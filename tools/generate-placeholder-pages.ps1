$pages = @(
    @{ File = 'subpages/about.html'; Key = 'about'; Title = 'About | inim-dx'; Root = '..' },
    @{ File = 'subpages/brand.html'; Key = 'brand'; Title = 'Brand | inim-dx' },
    @{ File = 'subpages/brand-groundbreakers.html'; Key = 'brandGroundbreakers'; Title = 'GROUNDBREAKERS | inim-dx' },
    @{ File = 'subpages/brand-nezs.html'; Key = 'brandNezs'; Title = "NEZ's | inim-dx" },
    @{ File = 'subpages/brand-aroma-crops.html'; Key = 'brandAromaCrops'; Title = 'AROMA CROPS | inim-dx' },
    @{ File = 'subpages/brand-kosaido.html'; Key = 'brandKosaido'; Title = '香彩堂 | inim-dx' },
    @{ File = 'subpages/brand-watoyo.html'; Key = 'brandWatoyo'; Title = 'WATOYO | inim-dx' },
    @{ File = 'subpages/brand-cocktail-soap.html'; Key = 'brandCocktailSoap'; Title = 'COCKTAIL SOAP | inim-dx' },
    @{ File = 'subpages/brand-enjoyth.html'; Key = 'brandEnjoyth'; Title = 'ENJOYNTH | inim-dx' },
    @{ File = 'subpages/brand-awaji.html'; Key = 'brandAwaji'; Title = 'AWAJI | inim-dx' },
    @{ File = 'subpages/brand-propolis.html'; Key = 'brandPropolis'; Title = '日プロポリース | inim-dx' },
    @{ File = 'subpages/items.html'; Key = 'items'; Title = 'Items | inim-dx' },
    @{ File = 'subpages/item-home-fragrance.html'; Key = 'itemHomeFragrance'; Title = 'Home Fragrance | inim-dx' },
    @{ File = 'subpages/item-body-care.html'; Key = 'itemBodyCare'; Title = 'Body Care | inim-dx' },
    @{ File = 'subpages/item-diy.html'; Key = 'itemDiy'; Title = 'DIY | inim-dx' },
    @{ File = 'subpages/item-sale.html'; Key = 'itemSale'; Title = 'Item Sale | inim-dx' },
    @{ File = 'subpages/item-ecology.html'; Key = 'itemEcology'; Title = 'Ecology | inim-dx' },
    @{ File = 'subpages/item-refill-tools.html'; Key = 'itemRefillTools'; Title = 'Refill Tools | inim-dx' },
    @{ File = 'subpages/item-gift-set.html'; Key = 'itemGiftSet'; Title = 'Gift Set | inim-dx' },
    @{ File = 'subpages/scent-search.html'; Key = 'scentSearch'; Title = 'Search by Scent | inim-dx' },
    @{ File = 'subpages/search-store-info.html'; Key = 'searchStoreInfo'; Title = 'Store Info | inim-dx' },
    @{ File = 'subpages/search-projects.html'; Key = 'searchProjects'; Title = 'Projects | inim-dx' },
    @{ File = 'subpages/search-events.html'; Key = 'searchEvents'; Title = 'Events | inim-dx' },
    @{ File = 'subpages/article.html'; Key = 'article'; Title = 'Article | inim-dx' },
    @{ File = 'subpages/sale.html'; Key = 'sale'; Title = 'Sale | inim-dx' },
    @{ File = 'subpages/stores.html'; Key = 'stores'; Title = 'Stores | inim-dx' },
    @{ File = 'subpages/account.html'; Key = 'account'; Title = 'Account | inim-dx' },
    @{ File = 'subpages/shopping-guide.html'; Key = 'shoppingGuide'; Title = 'Shopping Guide | inim-dx' },
    @{ File = 'subpages/legal.html'; Key = 'legal'; Title = 'Legal | inim-dx' },
    @{ File = 'subpages/contact.html'; Key = 'contact'; Title = 'Contact | inim-dx' },
    @{ File = 'subpages/newsletter.html'; Key = 'newsletter'; Title = 'Newsletter | inim-dx' },
    @{ File = 'subpages/register.html'; Key = 'register'; Title = 'Register | inim-dx' },
    @{ File = 'subpages/login.html'; Key = 'login'; Title = 'Login | inim-dx' },
    @{ File = 'subpages/cart.html'; Key = 'cart'; Title = 'Cart | inim-dx' },
    @{ File = 'subpages/privacy.html'; Key = 'privacy'; Title = 'Privacy Policy | inim-dx' },
    @{ File = 'subpages/rss.html'; Key = 'rss'; Title = 'RSS / ATOM | inim-dx'; Root = '..' },
    @{ File = 'app/login.html'; Key = 'appLogin'; Title = 'App Login | inim-dx'; Root = '..' },
    @{ File = 'app/password/forgot.html'; Key = 'appPasswordForgot'; Title = 'Password Forgot | inim-dx'; Root = '../..' },
    @{ File = 'app/password/reset.html'; Key = 'appPasswordReset'; Title = 'Password Reset | inim-dx'; Root = '../..' },
    @{ File = 'app/dashboard.html'; Key = 'appDashboard'; Title = 'Dashboard | inim-dx'; Root = '..' },
    @{ File = 'app/pages/home.html'; Key = 'appPagesHome'; Title = 'Home Admin | inim-dx'; Root = '../..' },
    @{ File = 'app/pages/workshop.html'; Key = 'appPagesWorkshop'; Title = 'Workshop Admin | inim-dx'; Root = '../..' },
    @{ File = 'app/publish.html'; Key = 'appPublish'; Title = 'Publish | inim-dx'; Root = '..' },
    @{ File = 'app/users/me.html'; Key = 'appUsersMe'; Title = 'Account Settings | inim-dx'; Root = '../..' }
)

foreach ($page in $pages) {
    $dir = Split-Path -Parent $page.File
    if ($dir) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $root = if ($page.Root) { $page.Root } else { '..' }
    $html = @"
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($page.Title)</title>
    <link rel="stylesheet" href="$root/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
</head>

<body data-root="$root" data-page-key="$($page.Key)">
    <main id="page-main"></main>
    <script src="$root/js/site-shell.js"></script>
</body>

</html>
"@

    Set-Content -Path $page.File -Value $html -Encoding UTF8
}
