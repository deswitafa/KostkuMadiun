import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { SITE } from '../data/config.js';
import { $, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

siap(() => {
  renderNavbar('tentang');
  renderFooter();
  $('#cta-wa').href = buatTautanWa(SITE.waAdmin, 'Halo Admin KostKu Madiun, saya ingin berkonsultasi.');
});
