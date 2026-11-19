/** Konten statis halaman "Untuk Pemilik" (langkah, fitur dasbor, FAQ). */

export const LANGKAH_PEMILIK = [
  { ikon: 'person_add', judul: 'Isi Formulir Singkat', isi: 'Isi nama, nomor WhatsApp aktif, dan nama kos, lalu kirim ke admin lewat WhatsApp.', catatan: 'Estimasi: 1 menit' },
  { ikon: 'upload_file', judul: 'Kirim Data & Foto Kos', isi: 'Lengkapi fasilitas, tipe kamar, tarif sewa, dan foto kamar. Admin siap membantu.', catatan: 'Panduan foto tersedia' },
  { ikon: 'verified', judul: 'Verifikasi Tim KostKu', isi: 'Admin Madiun memeriksa kecocokan alamat dan nomor kontak dalam 1x24 jam.', catatan: 'Maksimal 1x24 jam' },
  { ikon: 'celebration', judul: 'Kos Tampil & Terima Chat', isi: 'Listing tayang di halaman pencarian. Tinggal tunggu pesan survei dari calon penghuni.', catatan: 'Siap menerima penghuni' },
];

export const FITUR_DASBOR = [
  { ikon: 'payments', judul: 'Atur Harga Fleksibel', isi: 'Tentukan tarif harian, bulanan, atau tahunan, termasuk diskon khusus mahasiswa baru.' },
  { ikon: 'meeting_room', judul: 'Update Sisa Kamar Sekali Klik', isi: 'Kamar terisi? Ubah jumlah sisa kamar dan informasinya langsung berubah untuk calon penyewa.' },
  { ikon: 'photo_library', judul: 'Kelola Foto per Kategori', isi: 'Rapikan galeri: tampak depan, kamar tidur, kamar mandi, parkir, dan dapur bersama.' },
  { ikon: 'group', judul: 'Tag Penghuni Tepat Sasaran', isi: 'Tentukan jenis kos: Putri, Putra, atau Campuran, lengkap dengan peraturan kos.' },
  { ikon: 'query_stats', judul: 'Statistik Kunjungan', isi: 'Pantau tayangan listing dan klik WhatsApp tiap pekan.' },
  { ikon: 'domain_add', judul: 'Kelola Banyak Kos', isi: 'Punya lebih dari satu lokasi di Madiun? Pantau semuanya dari satu tempat.' },
];

export const FAQ_PEMILIK = [
  {
    pertanyaan: 'Apakah benar mendaftarkan kos di KostKu Madiun gratis?',
    jawaban: 'Ya. Tidak ada biaya pendaftaran, iuran bulanan, maupun persentase komisi ketika kamar Anda disewa.',
  },
  {
    pertanyaan: 'Bagaimana jika sisa kamar habis atau harga sewa berubah?',
    jawaban: 'Anda bisa memperbarui harga dan status kamar lewat dasbor. Jika kesulitan, kirim pesan singkat ke admin KostKu Madiun di WhatsApp dan kami bantu memperbaruinya.',
  },
  {
    pertanyaan: 'Berapa lama sampai kos saya tayang?',
    jawaban: 'Setelah data dan foto lengkap, tim kami memverifikasi lokasi dan nomor WhatsApp maksimal 1x24 jam. Setelah itu listing langsung tampil di pencarian.',
  },
  {
    pertanyaan: 'Siapa yang menerima pembayaran sewa?',
    jawaban: 'Pembayaran 100% diterima langsung oleh Anda. KostKu Madiun tidak menahan atau memotong uang sewa.',
  },
];
