import { NAV_ITEMS, PEMILIK_HREF, SITE } from '../data/config.js';
import { $, ikon, render } from '../lib/dom.js';

/**
 * Navbar bersama. Pasang di <div id="navbar"></div>.
 * @param {string} aktif id menu yang sedang aktif (lihat NAV_ITEMS)
 */
export function renderNavbar(aktif = '') {
  const tautan = NAV_ITEMS.map(
    ({ id, label, href }) =>
      `<a class="navbar__link ${id === aktif ? 'is-active' : ''}" href="${href}" ${id === aktif ? 'aria-current="page"' : ''}>${label}</a>`
  ).join('');

  render(
    '#navbar',
    `<header class="navbar">
      <div class="container navbar__inner">
        <a class="brand" href="index.html" aria-label="${SITE.nama} - beranda">
          <span class="brand__logo">${ikon('home_work')}</span>
          <span class="brand__text">
            <span class="brand__name">Kost<span>Ku</span></span>
            <span class="brand__city">Madiun</span>
          </span>
        </a>
        <nav class="navbar__menu" id="navbar-menu" aria-label="Menu utama">
          ${tautan}
          <a class="btn btn--sun btn--sm navbar__cta" href="${PEMILIK_HREF}">${ikon('storefront')}<span>Untuk Pemilik Kos</span></a>
        </nav>
        <button class="navbar__toggle" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="navbar-menu">${ikon('menu')}</button>
      </div>
    </header>`
  );

  const toggle = $('.navbar__toggle');
  const menu = $('#navbar-menu');
  toggle.addEventListener('click', () => {
    const terbuka = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(terbuka));
  });
}
