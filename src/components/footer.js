import { NAV_ITEMS, PEMILIK_HREF, SITE } from '../data/config.js';
import { ikon, render } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

/** Footer bersama. Pasang di <div id="footer"></div>. */
export function renderFooter() {
  const tautan = [...NAV_ITEMS, { label: 'Untuk Pemilik', href: PEMILIK_HREF }]
    .map(({ label, href }) => `<li><a href="${href}">${label}</a></li>`)
    .join('');

  render(
    '#footer',
    `<footer class="footer">
      <div class="container footer__grid">
        <div>
          <a class="brand" href="index.html">
            <span class="brand__logo">${ikon('home_work')}</span>
            <span class="brand__text">
              <span class="brand__name">Kost<span>Ku</span></span>
              <span class="brand__city">Madiun</span>
            </span>
          </a>
          <p class="footer__tagline">${SITE.tagline}</p>
          <p class="footer__desc">${SITE.deskripsiSingkat}</p>
        </div>
        <div>
          <h4 class="footer__title">Navigasi Cepat</h4>
          <ul class="footer__list">${tautan}</ul>
        </div>
        <div>
          <h4 class="footer__title">Layanan Bantuan Resmi</h4>
          <p class="footer__desc">Punya pertanyaan seputar ketersediaan kos atau ingin mendaftarkan kos Anda?</p>
          <a class="btn btn--wa btn--sm" href="${buatTautanWa(SITE.waAdmin)}" target="_blank" rel="noopener noreferrer">${ikon('chat')}<span>WhatsApp ${SITE.waAdminTampil}</span></a>
        </div>
      </div>
      <div class="container footer__bottom">
        <p>© ${SITE.tahun} ${SITE.nama}. All rights reserved.</p>
        <p>Kebijakan Privasi · Syarat &amp; Ketentuan</p>
      </div>
    </footer>`
  );
}
