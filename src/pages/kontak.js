import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { SITE } from '../data/config.js';
import { KOS } from '../data/kos.js';
import { LABEL_TIPE, tampilkanNomor } from '../lib/format.js';
import { $, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

const renderKontakKos = (kos) => `<article class="card owner-contact">
  <span class="chip chip--${kos.tipe}" style="align-self:flex-start">${LABEL_TIPE[kos.tipe]}</span>
  <h3>${kos.nama}</h3>
  <p style="font-size:.78rem">${kos.lokasi.area}, Madiun</p>
  <span class="num">${tampilkanNomor(kos.kontak.whatsapp)}</span>
  <a class="btn btn--wa btn--sm" target="_blank" rel="noopener noreferrer"
     href="${buatTautanWa(kos.kontak.whatsapp, `Halo, saya melihat ${kos.nama} di KostKu Madiun. Apakah masih ada kamar kosong?`)}">${ikon('chat')}Chat WhatsApp</a>
</article>`;

siap(() => {
  renderNavbar('kontak');
  renderFooter();

  const tautanAdmin = buatTautanWa(SITE.waAdmin, 'Halo Admin KostKu Madiun, saya ingin bertanya.');
  $('#hero-wa').href = tautanAdmin;
  $('#info-wa-btn').href = tautanAdmin;
  $('#info-wa').textContent = SITE.waAdminTampil;
  $('#info-telepon').textContent = SITE.telepon;
  $('#info-email').textContent = SITE.email;
  $('#info-email').href = `mailto:${SITE.email}`;
  $('#info-alamat').textContent = SITE.alamatKantor;
  $('#info-maps').href = SITE.mapsKantor;

  render('#owner-contacts', KOS.map(renderKontakKos).join(''));
});
