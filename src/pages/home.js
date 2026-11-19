import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderKosCard } from '../components/kos-card.js';
import { renderAccordionItem, initAccordion } from '../components/accordion.js';
import { initMascot } from '../components/mascot.js';
import { SITE } from '../data/config.js';
import { KOS, getKosById } from '../data/kos.js';
import { FAQ } from '../data/faq.js';
import { formatRupiah } from '../lib/format.js';
import { $, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

const KOS_REKOMENDASI = ['ichi-kost-putri', 'bu-ning-kos-cowok-madiun', 'griya-kos-putri-kurnia'];
const JUMLAH_FAQ = 4;

const KATEGORI = [
  { tipe: 'putri', judul: 'Kos Putri', ikon: 'female', label: 'Cari Kos Putri', deskripsi: 'Khusus mahasiswi & karyawati. Lingkungan tenang dan aman dengan aturan gerbang yang teratur.' },
  { tipe: 'putra', judul: 'Kos Putra', ikon: 'male', label: 'Cari Kos Putra', deskripsi: 'Khusus mahasiswa & pekerja pria. Parkir motor lega, akses fleksibel, dan santai untuk belajar kelompok.' },
  { tipe: 'campuran', judul: 'Campuran', ikon: 'diversity_3', label: 'Cari Campuran', deskripsi: 'Terbuka untuk umum, pasutri sah, maupun perantau profesional dengan tata tertib yang ramah.' },
];

function renderStatStrip() {
  const termurah = Math.min(...KOS.map((k) => k.harga.bulanan));
  const item = (kelas, ikonNama, label, nilai) =>
    `<div class="stat stat--${kelas}"><div class="icon-tile">${ikon(ikonNama)}</div><div><small>${label}</small><strong>${nilai}</strong></div></div>`;
  render(
    '#stat-strip',
    [
      item('blue', 'apartment', 'Pilihan Hunian', `${KOS.length} Pilihan Kos`),
      item('cream', 'calendar_month', 'Periode Fleksibel', 'Harian/Bulanan/Tahunan'),
      item('mint', 'payments', 'Budget Ramah', `Mulai ${formatRupiah(termurah).replace('.000', ' rb')}/bln`),
      item('sky', 'chat', 'Respon Cepat', 'Hubungi via WhatsApp'),
    ].join('')
  );
}

function renderKategori() {
  render(
    '#kategori-penghuni',
    KATEGORI.map((k) => {
      const jumlah = KOS.filter((kos) => kos.tipe === k.tipe).length;
      return `<div class="kategori kategori--${k.tipe}">
        <div>
          <div class="kategori__top"><div class="icon-tile">${ikon(k.ikon)}</div><span class="kategori__count">${jumlah} Listing</span></div>
          <h3>${k.judul}</h3><p>${k.deskripsi}</p>
        </div>
        <a class="btn btn--sm" href="kos.html?tipe=${k.tipe}"><span>${k.label}</span>${ikon('arrow_forward')}</a>
      </div>`;
    }).join('')
  );
}

siap(() => {
  renderNavbar('beranda');
  renderFooter();
  renderStatStrip();
  renderKategori();

  render('#kos-rekomendasi-list', KOS_REKOMENDASI.map((id) => renderKosCard(getKosById(id))).join(''));

  const faqRoot = $('#faq-preview');
  render(faqRoot, FAQ.slice(0, JUMLAH_FAQ).map((f, i) => renderAccordionItem(f, i === 0)).join(''));
  initAccordion(faqRoot);

  $('#kosty-wa').href = buatTautanWa(SITE.waAdmin, 'Halo Si Kosty, bantu rekomendasi kos di Madiun dong!');
  initMascot();
});
