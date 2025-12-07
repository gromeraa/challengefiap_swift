// Calcula o offset do sticky para não sobrepor o header, dinamicamente
(function () {
    function getHeaderHeight() {
        const welcome = document.querySelector('.welcome-bar');
        const header = document.querySelector('.main-header');
        const desktopNav = document.querySelector('.desktop-nav');
        const h1 = welcome ? welcome.offsetHeight : 0;
        const h2 = header ? header.offsetHeight : 0;
        const h3 = desktopNav ? desktopNav.offsetHeight : 0;
        return h1 + h2 + h3;
    }

    function applyStickyOffset() {
        const aside = document.querySelector('.header-offset');
        if (!aside) return;
        const total = getHeaderHeight();
        // Em desktop usa sticky; em mobile/tablet o aside já está no fluxo normal
        if (window.matchMedia('(min-width: 1200px)').matches) {
            aside.style.top = total + 8 + 'px'; // +8px de respiro visual
        } else {
            aside.style.top = '';
        }
    }

    window.addEventListener('load', applyStickyOffset);
    window.addEventListener('resize', applyStickyOffset);
})();