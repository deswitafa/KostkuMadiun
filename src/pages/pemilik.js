import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderAccordionItem, initAccordion } from '../components/accordion.js';
import { SITE } from '../data/config.js';
import { FAQ_PEMILIK, FITUR_DASBOR, LANGKAH_PEMILIK } from '../data/pemilik.js';
import { $, $$, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa, pesanDaftarPemilik } from '../lib/whatsapp.js';

/** Aturan validasi per kolom: mengembalikan pesan error atau '' bila valid. */
const ATURAN = {
  nama: (v) => (v.trim().length < 3 ? 'Nama minimal 3 karakter.' : ''),
  whatsapp: (v) => (/^(\+?62|0)8\d{8,12}$/.test(v.replace(/[\s-]/g, '')) ? '' : 'Masukkan nomor WhatsApp yang valid, mis. 0812xxxxxxxx.'),
  email: (v) => (!v || /^\S+@\S+\.\S+$/.test(v) ? '' : 'Format email belum benar.'),
  namaKos: (v) => (v.trim().length < 3 ? 'Nama kos minimal 3 karakter.' : ''),
};

const renderLangkah = (l, i) => `<article class="card step-card">
  <span class="step-card__no">${i + 1}</span>
  <h3>${l.judul}</h3><p>${l.isi}</p>
  <span class="chip chip--status-ok">${ikon('schedule')}${l.catatan}</span>
</article>`;

const renderFitur = (f) => `<article class="card contact-card">
  <div class="icon-tile">${ikon(f.ikon)}</div><h3>${f.judul}</h3><p>${f.isi}</p>
</article>`;

function tampilkanError(form, nama, pesan) {
  $(`[data-error-for="${nama}"]`, form).textContent = pesan;
}

function kirimFormulir(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  let valid = true;

  Object.entries(ATURAN).forEach(([nama, cek]) => {
    const pesan = cek(data[nama] ?? '');
    tampilkanError(form, nama, pesan);
    if (pesan) valid = false;
  });
  if (!data.setuju) {
    tampilkanError(form, 'setuju', 'Centang persetujuan untuk melanjutkan.');
    valid = false;
  } else {
    tampilkanError(form, 'setuju', '');
  }
  if (!valid) return;

  const pesan = pesanDaftarPemilik({ ...data, email: data.email || '-' });
  window.open(buatTautanWa(SITE.waAdmin, pesan), '_blank', 'noopener');
}

siap(() => {
  renderNavbar('pemilik');
  renderFooter();

  render('#owner-steps', LANGKAH_PEMILIK.map(renderLangkah).join(''));
  render('#owner-features', FITUR_DASBOR.map(renderFitur).join(''));
  render('#owner-faq', FAQ_PEMILIK.map((item) => renderAccordionItem(item)).join(''));
  initAccordion($('#owner-faq'));

  $('#form-daftar').addEventListener('submit', kirimFormulir);
  $('#cta-wa').href = buatTautanWa(SITE.waAdmin, 'Halo Admin KostKu Madiun, saya ingin konsultasi pendaftaran kos.');
});
