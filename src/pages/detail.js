import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderKosCard } from '../components/kos-card.js';
import { renderGallery, initGallery } from '../components/gallery.js';
import { bukaBookingModal } from '../components/booking-modal.js';
import { KOS, getKosById } from '../data/kos.js';
import { getFasilitas } from '../data/fasilitas.js';
import { LABEL_PERIODE, LABEL_TIPE, SATUAN_PERIODE, formatRupiah, persenHematTahunan, statusKamar } from '../lib/format.js';
import { $, $$, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa, pesanTertarik } from '../lib/whatsapp.js';

const PERIODE = ['harian', 'bulanan', 'tahunan'];

/** Satu bagian bernomor/berjudul; tidak dirender bila isinya kosong. */
const panel = (judul, ikonNama, isi) =>
  isi ? `<section class="panel"><h2>${ikon(ikonNama)}${judul}</h2>${isi}</section>` : '';

/* ---------- Potongan tampilan ---------- */

function renderIdentitas(kos) {
  const status = statusKamar(kos.sisaKamar);
  const ringkasan = (kos.ringkasan ?? [])
    .map((r) => `<div class="metric">${ikon(r.ikon)}<div><small>${r.label}</small><strong>${r.nilai}</strong></div></div>`)
    .join('');
  return `<section class="panel identity">
    <div class="identity__top">
      <span class="chip chip--${kos.tipe}">${LABEL_TIPE[kos.tipe]}</span>
      <span class="chip chip--status-${status.kelas}"><i class="dot"></i>${status.label}</span>
    </div>
    <h1>${kos.nama}</h1>
    <p class="identity__addr">${ikon('location_on')}${kos.lokasi.alamat}</p>
    ${ringkasan ? `<div class="metrics">${ringkasan}</div>` : ''}
  </section>`;
}

const renderTentang = (kos) =>
  panel('Tentang Kos Ini', 'info', kos.deskripsi?.length ? `<div class="prose">${kos.deskripsi.map((p) => `<p>${p}</p>`).join('')}</div>` : '');

const renderFasilitas = (kos) =>
  panel(
    'Fasilitas',
    'widgets',
    `<div class="facility-grid">${kos.fasilitas
      .map((id) => {
        const f = getFasilitas(id);
        return `<div class="facility"><span class="icon-tile">${ikon(f.ikon)}</span>${f.label}</div>`;
      })
      .join('')}</div>`
  );

const renderPeraturan = (kos) =>
  panel(
    'Peraturan Kos',
    'gavel',
    kos.peraturan?.length
      ? `<div class="rules-grid">${kos.peraturan
          .map((p) => `<div class="rule">${ikon(p.ikon)}<div><strong>${p.judul}</strong><span class="t">${p.isi}</span></div></div>`)
          .join('')}</div>`
      : ''
  );

function renderLokasi(kos) {
  const jarak = kos.lokasi.jarak?.length
    ? `<div class="distance-grid">${kos.lokasi.jarak
        .map((j) => `<div class="distance"><b>${j.waktu.split(' ')[0]}</b><div><strong>${j.label}</strong><span>${j.waktu} · ${j.jarak}</span></div></div>`)
        .join('')}</div>`
    : '';
  return panel(
    'Lokasi',
    'map',
    `<div class="location"><p>${kos.lokasi.alamat}</p>
      <a class="btn btn--ghost btn--sm" href="${kos.lokasi.mapsUrl}" target="_blank" rel="noopener noreferrer">${ikon('open_in_new')}Buka di Google Maps</a>
    </div>${jarak}`
  );
}

/** Panel pemesanan di kanan; bagian harga dirender ulang saat periode berganti. */
function renderBooking(kos) {
  const status = statusKamar(kos.sisaKamar);
  return `<aside class="booking" id="booking" aria-label="Pemesanan">
    <div class="booking__head">
      <div><small>Pemilik Kos</small><h2>${kos.nama}</h2><p>${ikon('verified')}Kontak langsung via WhatsApp</p></div>
      <span class="booking__verified">${ikon('verified_user')}</span>
    </div>
    <div>
      <span class="filter-label" style="display:block;margin-bottom:8px;font-size:.7rem;font-weight:700;text-transform:uppercase;color:var(--muted)">Pilih Periode Sewa</span>
      <div class="segmented" id="periode">
        ${PERIODE.filter((p) => kos.harga[p])
          .map((p) => `<button class="segmented__btn ${p === 'bulanan' ? 'is-active' : ''}" type="button" data-periode="${p}">${LABEL_PERIODE[p]}</button>`)
          .join('')}
      </div>
    </div>
    <div class="booking__price" id="booking-price"></div>
    <div class="booking__rooms"><span>Ketersediaan</span><b>${status.label}</b></div>
    <div class="booking__actions">
      ${
        status.tersedia
          ? `<button class="btn btn--wa" type="button" id="btn-booking">${ikon('chat')}Hubungi via WhatsApp</button>`
          : `<a class="btn btn--wa" id="btn-tunggu" href="#" target="_blank" rel="noopener noreferrer">${ikon('chat')}Tanya Daftar Tunggu</a>`
      }
    </div>
    <p class="booking__note">${ikon('info')}Pembayaran dan kesepakatan dilakukan langsung dengan pemilik. KostKu Madiun hanya menampilkan informasi.</p>
  </aside>`;
}

function renderHarga(kos, periode) {
  const harga = kos.harga[periode];
  const hemat = periode === 'tahunan' ? persenHematTahunan(kos.harga) : null;
  const catatan = [kos.termasuk, hemat ? `Hemat ${hemat}% dibanding bayar bulanan` : '']
    .filter(Boolean)
    .map((t) => `<p class="note">${ikon('check_circle')}${t}</p>`)
    .join('');
  return `<span class="amount">${formatRupiah(harga)}<small>${SATUAN_PERIODE[periode]}</small></span>${catatan}`;
}

function renderTidakDitemukan() {
  return `<div class="notfound">${ikon('search_off')}
    <h1>Kos tidak ditemukan</h1>
    <p>Tautan yang kamu buka mungkin salah atau kos sudah tidak terdaftar.</p>
    <a class="btn btn--sky" href="kos.html">Lihat Semua Kos</a></div>`;
}

/* ---------- Halaman ---------- */

function tampilkanDetail(kos) {
  document.title = `${kos.nama} - KostKu Madiun`;
  let periode = 'bulanan';

  const mirip = KOS.filter((k) => k.id !== kos.id && k.tipe === kos.tipe).concat(KOS.filter((k) => k.id !== kos.id && k.tipe !== kos.tipe)).slice(0, 3);

  render(
    '#detail-root',
    `<div class="detail">
      <nav class="breadcrumb" aria-label="Breadcrumb" style="margin-bottom:18px">
        <a href="index.html">Beranda</a>${ikon('chevron_right')}<a href="kos.html">Cari Kos</a>${ikon('chevron_right')}<span class="is-current">${kos.nama}</span>
      </nav>
      <div class="detail__layout">
        <div class="detail__main">
          <section class="panel panel--gallery" id="gallery-root">${renderGallery(kos.gambar)}</section>
          ${renderIdentitas(kos)}
          ${renderTentang(kos)}
          ${renderFasilitas(kos)}
          ${renderPeraturan(kos)}
          ${renderLokasi(kos)}
        </div>
        ${renderBooking(kos)}
      </div>
      <section class="related">
        <div class="related__head"><h2>Kos Lain yang Mungkin Cocok</h2><a class="btn btn--ghost btn--sm" href="kos.html">Lihat Semua</a></div>
        <div class="grid grid--3">${mirip.map((k) => renderKosCard(k)).join('')}</div>
      </section>
    </div>`
  );

  initGallery($('#gallery-root'), kos.gambar);

  const perbaruiHarga = () => render('#booking-price', renderHarga(kos, periode));
  perbaruiHarga();

  $('#periode').addEventListener('click', (e) => {
    const tombol = e.target.closest('[data-periode]');
    if (!tombol) return;
    periode = tombol.dataset.periode;
    $$('#periode .segmented__btn').forEach((b) => b.classList.toggle('is-active', b === tombol));
    perbaruiHarga();
  });

  $('#btn-booking')?.addEventListener('click', () => bukaBookingModal(kos, { periode }));
  const tunggu = $('#btn-tunggu');
  if (tunggu) tunggu.href = buatTautanWa(kos.kontak.whatsapp, pesanTertarik(kos, "bulanan"));
}

siap(() => {
  renderNavbar('kos');
  renderFooter();

  const id = new URLSearchParams(window.location.search).get('id');
  const kos = getKosById(id);
  if (kos) tampilkanDetail(kos);
  else render('#detail-root', renderTidakDitemukan());
});
