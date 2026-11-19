import { getFasilitas } from '../data/fasilitas.js';
import { LABEL_TIPE, SATUAN_PERIODE, formatRupiah, statusKamar } from '../lib/format.js';
import { ikon } from '../lib/dom.js';

const MAKS_FASILITAS = 4;

const teksLokasi = (lokasi) =>
  `${lokasi.area}, Madiun${lokasi.kampusTerdekat ? ` (${lokasi.kampusTerdekat})` : ''}`;

function renderHarga(kos, periode) {
  const harga = kos.harga[periode];
  if (!harga) return '<span class="kos-card__price kos-card__price--na">Tanya pemilik</span>';
  return `<span class="kos-card__price">${formatRupiah(harga)}<small>${SATUAN_PERIODE[periode]}</small></span>`;
}

/**
 * Kartu kos untuk daftar pencarian dan rekomendasi beranda.
 * @param {object} kos  data kos
 * @param {{periode?: 'harian'|'bulanan'|'tahunan'}} opsi
 */
export function renderKosCard(kos, { periode = 'bulanan' } = {}) {
  const status = statusKamar(kos.sisaKamar);
  const foto = kos.gambar[0];
  const fasilitas = kos.fasilitas.slice(0, MAKS_FASILITAS).map((id) => {
    const f = getFasilitas(id);
    return `<span class="chip chip--fasilitas">${ikon(f.ikon)} ${f.singkat ?? f.label}</span>`;
  });
  const sisa = kos.fasilitas.length - MAKS_FASILITAS;
  if (sisa > 0) fasilitas.push(`<span class="chip chip--fasilitas">+${sisa}</span>`);

  const aksi = status.tersedia
    ? `<a class="btn btn--sky btn--sm" href="detail.html?id=${kos.id}">Lihat Detail</a>`
    : `<a class="btn btn--muted btn--sm" href="detail.html?id=${kos.id}">Tanya Daftar Tunggu</a>`;

  return `<article class="kos-card ${status.tersedia ? '' : 'is-full'}">
    <a class="kos-card__media" href="detail.html?id=${kos.id}" tabindex="-1" aria-hidden="true">
      <img src="${foto.src}" alt="${foto.alt}" loading="lazy">
      <span class="chip chip--${kos.tipe} kos-card__tipe">${LABEL_TIPE[kos.tipe]}</span>
      <span class="chip chip--status-${status.kelas} kos-card__status"><i class="dot"></i>${status.label}</span>
    </a>
    <div class="kos-card__body">
      <p class="kos-card__lokasi">${ikon('location_on')}${teksLokasi(kos.lokasi)}</p>
      <h3 class="kos-card__nama"><a href="detail.html?id=${kos.id}">${kos.nama}</a></h3>
      <div class="kos-card__fasilitas">${fasilitas.join('')}</div>
    </div>
    <div class="kos-card__footer">
      <div><small>Harga Sewa</small>${renderHarga(kos, periode)}</div>
      ${aksi}
    </div>
  </article>`;
}
