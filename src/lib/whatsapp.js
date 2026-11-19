/** Pembuat tautan & template pesan WhatsApp (https://wa.me/<nomor>?text=...). */
import { formatRupiah, SATUAN_PERIODE } from './format.js';

export const buatTautanWa = (nomor, pesan = '') =>
  `https://wa.me/${nomor}${pesan ? `?text=${encodeURIComponent(pesan)}` : ''}`;

/** Pesan singkat untuk tombol "Lanjut Pesan" di halaman detail. */
export const pesanTertarik = (kos, periode) =>
  `Halo Admin ${kos.nama}, saya tertarik sewa ${periode} kamar kos. Apakah masih tersedia?`;

/** Pesan lengkap dari formulir modal pemesanan. */
export function pesanBooking({ kos, nama, tanggal, durasi, penghuni, periode }) {
  const harga = kos.harga[periode.toLowerCase()];
  const satuan = SATUAN_PERIODE[periode.toLowerCase()];
  return (
    `Halo Kak, saya ${nama || 'calon penghuni'} dari KostKu Madiun. ` +
    `Saya tertarik dengan ${kos.nama} untuk sewa ${periode.toUpperCase()}, ` +
    `mulai ${tanggal || 'segera'}, selama ${durasi} (${formatRupiah(harga)}${satuan}) untuk ${penghuni}. ` +
    'Apakah kamar masih tersedia? Saya ingin survei lokasi. Terima kasih.'
  );
}

/** Pesan pendaftaran mitra pemilik kos ke admin. */
export const pesanDaftarPemilik = ({ nama, whatsapp, email, namaKos }) =>
  'Halo Admin KostKu Madiun, saya ingin mendaftarkan kos.\n' +
  `Nama pemilik: ${nama}\nWhatsApp: ${whatsapp}\nEmail: ${email}\nNama kos: ${namaKos}`;
