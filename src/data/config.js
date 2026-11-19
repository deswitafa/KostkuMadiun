/**
 * Konfigurasi situs: identitas, kontak admin, dan menu navigasi.
 * Ubah nilai di sini, bukan di dalam komponen.
 */
export const SITE = {
  nama: 'KostKu Madiun',
  tagline: 'Temukan Kos yang Cocok, Tanpa Ribet.',
  deskripsiSingkat:
    'Platform pencarian hunian kos terpadu dan ramah mahasiswa di Kota Madiun dan sekitarnya.',
  tahun: 2026,
  waAdmin: '6281234567890', // format internasional tanpa "+"
  waAdminTampil: '+62 812-3456-7890',
  telepon: '(0351) 456-789',
  email: 'info@kostkumadiun.id',
  alamatKantor: 'Jl. Serayu No. 84, Taman, Kota Madiun, Jawa Timur 63133',
  mapsKantor: 'https://maps.google.com/?q=Jl.+Serayu+No.+84+Madiun',
};

/** Menu utama. `id` dipakai untuk menandai halaman aktif. */
export const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda', href: 'index.html' },
  { id: 'kos', label: 'Cari Kos', href: 'kos.html' },
  { id: 'faq', label: 'FAQ', href: 'faq.html' },
  { id: 'tentang', label: 'Tentang', href: 'tentang.html' },
  { id: 'kontak', label: 'Kontak', href: 'kontak.html' },
];

export const PEMILIK_HREF = 'pemilik.html';
