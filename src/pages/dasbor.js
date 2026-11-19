import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { SITE } from '../data/config.js';
import { PEMILIK_DEMO } from '../data/dasbor.js';
import { getKosById } from '../data/kos.js';
import { LABEL_TIPE, SATUAN_PERIODE, formatRupiah } from '../lib/format.js';
import { $, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

const KUNCI_SIMPAN = 'kostku:dasbor:sisa-kamar';

/* ---------- Penyimpanan ringan (opsional; aman bila diblokir) ---------- */
const bacaSimpanan = () => {
  try {
    return JSON.parse(localStorage.getItem(KUNCI_SIMPAN)) ?? {};
  } catch {
    return {};
  }
};
const tulisSimpanan = (data) => {
  try {
    localStorage.setItem(KUNCI_SIMPAN, JSON.stringify(data));
  } catch {
    /* abaikan: tampilan tetap jalan tanpa penyimpanan */
  }
};

/** Gabungkan data demo dengan data kos (bila punya kosId) dan sisa kamar tersimpan. */
function siapkanProperti() {
  const simpanan = bacaSimpanan();
  return PEMILIK_DEMO.properti.map((p, i) => {
    const kos = p.kosId ? getKosById(p.kosId) : null;
    const dasar = kos
      ? { nama: kos.nama, tipe: kos.tipe, alamat: kos.lokasi.alamat, harga: kos.harga, sisaKamar: kos.sisaKamar }
      : p;
    const kunci = p.kosId ?? `demo-${i}`;
    return { ...p, ...dasar, kunci, sisaKamar: simpanan[kunci] ?? dasar.sisaKamar };
  });
}

let properti = siapkanProperti();

/* ---------- Tampilan ---------- */
const hargaTeks = (harga) =>
  Object.entries(harga)
    .filter(([, nilai]) => nilai)
    .map(([periode, nilai]) => `<span>${formatRupiah(nilai)} <small>${SATUAN_PERIODE[periode]}</small></span>`)
    .join('');

function renderKartu(p) {
  const aktif = p.status === 'aktif';
  const lencanaStatus = aktif
    ? `<span class="chip chip--status-ok"><i class="dot"></i>Aktif</span>`
    : `<span class="chip chip--status-warn">${ikon('hourglass_top')}Verifikasi Tim</span>`;
  return `<article class="card own-card" data-kunci="${p.kunci}">
    <div class="own-card__top"><span class="chip chip--${p.tipe}">${LABEL_TIPE[p.tipe]}</span>${lencanaStatus}</div>
    <h3>${p.nama}</h3>
    <p class="own-card__addr">${ikon('location_on')}${p.alamat}</p>
    <div class="own-card__price">${hargaTeks(p.harga)}</div>
    <div class="own-card__rooms">
      <div><strong>Kontrol Cepat Sisa Kamar</strong><small>Atur jumlah kamar yang masih kosong</small></div>
      <div class="stepper">
        <button type="button" data-aksi="kurang" aria-label="Kurangi sisa kamar">${ikon('remove')}</button>
        <output>${p.sisaKamar} Kamar</output>
        <button type="button" data-aksi="tambah" aria-label="Tambah sisa kamar">${ikon('add')}</button>
      </div>
    </div>
    <div class="own-card__actions">
      ${p.kosId ? `<a class="btn btn--ghost btn--sm" href="detail.html?id=${p.kosId}">${ikon('visibility')}Lihat Halaman Publik</a>` : ''}
      <span class="chip chip--status-ok">${ikon('photo_library')}${p.jumlahFoto} foto</span>
    </div>
  </article>`;
}

function renderStat() {
  const aktif = properti.filter((p) => p.status === 'aktif').length;
  const sisa = properti.reduce((total, p) => total + p.sisaKamar, 0);
  const menunggu = properti.length - aktif;
  const tile = (ikonNama, nilai, label) =>
    `<div class="card stat-tile"><div class="icon-tile">${ikon(ikonNama)}</div><div><strong>${nilai}</strong><span class="l">${label}</span></div></div>`;
  render(
    '#stat-grid',
    tile('holiday_village', properti.length, `Total Kos (${aktif} aktif)`) +
      tile('bed', sisa, 'Kamar Tersisa') +
      tile('hourglass_top', menunggu, 'Menunggu Verifikasi')
  );
}

function renderVerifikasi() {
  const langkah = PEMILIK_DEMO.verifikasi;
  const persen = Math.round((langkah.filter((l) => l.selesai).length / langkah.length) * 100);
  $('#verif-bar').style.width = `${persen}%`;
  render(
    '#verif-list',
    langkah
      .map((l) => `<li class="${l.selesai ? '' : 'is-pending'}">${ikon(l.selesai ? 'check_circle' : 'pending')}${l.label}</li>`)
      .join('')
  );
}

function renderSemua() {
  render('#own-list', properti.map(renderKartu).join(''));
  renderStat();
}

/* ---------- Interaksi ---------- */
function ubahSisaKamar(kunci, selisih) {
  properti = properti.map((p) => (p.kunci === kunci ? { ...p, sisaKamar: Math.max(0, p.sisaKamar + selisih) } : p));
  const simpanan = Object.fromEntries(properti.map((p) => [p.kunci, p.sisaKamar]));
  tulisSimpanan(simpanan);
  renderSemua();
}

siap(() => {
  renderNavbar('pemilik');
  renderFooter();

  $('#dash-title').textContent = `Halo, ${PEMILIK_DEMO.nama}! 👋`;
  $('#dash-wa').href = buatTautanWa(SITE.waAdmin, 'Halo Admin KostKu Madiun, saya butuh bantuan mengelola data kos.');

  renderSemua();
  renderVerifikasi();

  $('#own-list').addEventListener('click', (e) => {
    const tombol = e.target.closest('[data-aksi]');
    if (!tombol) return;
    const kunci = tombol.closest('[data-kunci]').dataset.kunci;
    ubahSisaKamar(kunci, tombol.dataset.aksi === 'tambah' ? 1 : -1);
  });
});
