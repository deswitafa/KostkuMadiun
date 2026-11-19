/** Fungsi format murni (tanpa akses DOM) supaya mudah diuji. */

/** 850000 -> "Rp 850.000" */
export const formatRupiah = (angka) => `Rp ${Number(angka).toLocaleString('id-ID')}`;

/** "500.000" / "Rp 500.000" -> 500000. Mengembalikan null bila kosong/tidak valid. */
export function parseRupiah(teks) {
  const digit = String(teks ?? '').replace(/\D/g, '');
  return digit ? Number(digit) : null;
}

export const SATUAN_PERIODE = { harian: '/hari', bulanan: '/bln', tahunan: '/thn' };
export const LABEL_PERIODE = { harian: 'Harian', bulanan: 'Bulanan', tahunan: 'Tahunan' };

export const LABEL_TIPE = { putri: 'Putri', putra: 'Putra', campuran: 'Campuran' };

/** Status sisa kamar: hijau (>=3), kuning (1-2), abu-abu (0). */
export function statusKamar(sisa) {
  if (sisa <= 0) return { kelas: 'full', label: 'Penuh', tersedia: false };
  if (sisa <= 2) return { kelas: 'warn', label: `Sisa ${sisa} kamar`, tersedia: true };
  return { kelas: 'ok', label: `Sisa ${sisa} kamar`, tersedia: true };
}

/** Persentase hemat sewa tahunan dibanding 12x bulanan (null bila tidak relevan). */
export function persenHematTahunan(harga) {
  if (!harga.tahunan || !harga.bulanan) return null;
  const hemat = Math.round((1 - harga.tahunan / (harga.bulanan * 12)) * 100);
  return hemat > 0 ? hemat : null;
}

/** Escape teks dari pengguna sebelum disisipkan ke innerHTML. */
export function escapeHtml(teks) {
  return String(teks).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/** "6281331270921" -> "0813-3127-0921" */
export function tampilkanNomor(waInternasional) {
  const lokal = `0${String(waInternasional).slice(2)}`;
  return `${lokal.slice(0, 4)}-${lokal.slice(4, 8)}-${lokal.slice(8)}`;
}
