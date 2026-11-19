/** Kategori dan pertanyaan FAQ. `jawaban` boleh berisi HTML sederhana (<strong>, <em>). */
export const FAQ_KATEGORI = [
  { id: 'cari-kos', label: 'Mencari Kos', tema: 'putra' },
  { id: 'pesan-bayar', label: 'Pemesanan & Pembayaran', tema: 'ok' },
  { id: 'penghuni-aturan', label: 'Penghuni & Aturan', tema: 'warn' },
  { id: 'pemilik-kos', label: 'Pemilik Kos', tema: 'campur' },
];

export const FAQ = [
  {
    kategori: 'cari-kos',
    pertanyaan: 'Bagaimana cara mencari kos di KostKu Madiun?',
    kataKunci: 'cara mencari filter kampus unipma poltek foto asli',
    jawaban:
      'Buka halaman <strong>Cari Kos</strong> atau ketik nama area/kampus di kotak pencarian. Pasang filter tipe penghuni, rentang harga, dan fasilitas, lalu buka kartu kos untuk melihat foto, fasilitas, sisa kamar, dan peta.',
  },
  {
    kategori: 'cari-kos',
    pertanyaan: 'Apa arti tag Kos Putri, Kos Putra, dan Campuran?',
    kataKunci: 'arti tag putri putra campuran gender penghuni',
    jawaban:
      '<strong>Putri</strong> khusus penghuni perempuan, <strong>Putra</strong> khusus penghuni laki-laki, dan <strong>Campuran</strong> menerima putra maupun putri (umumnya di area terpisah) atau pasutri sah dengan surat resmi.',
  },
  {
    kategori: 'cari-kos',
    pertanyaan: 'Apakah foto kos yang ditampilkan asli?',
    kataKunci: 'foto asli survei verifikasi keaslian kamar mandi',
    jawaban:
      'Foto berasal dari verifikasi tim KostKu atau materi yang dikirim langsung oleh pemilik kos. Tetap disarankan survei langsung sebelum membayar.',
  },
  {
    kategori: 'cari-kos',
    pertanyaan: 'Apa arti status "Sisa N kamar"? Seberapa akurat?',
    kataKunci: 'sisa kamar akurat kuota status hijau kuning',
    jawaban:
      'Status diperbarui berdasarkan konfirmasi pengelola kos: hijau untuk sisa 3 kamar atau lebih, kuning untuk sisa 1–2 kamar, dan abu-abu untuk penuh (bisa tanya daftar tunggu). Konfirmasi ulang ke pemilik sebelum survei.',
  },
  {
    kategori: 'pesan-bayar',
    pertanyaan: 'Bisa sewa harian, bulanan, dan tahunan?',
    kataKunci: 'sewa harian bulanan tahunan durasi kontrak',
    jawaban:
      'Sebagian besar kos melayani sewa bulanan, dan beberapa menyediakan sewa harian atau tahunan (sering dengan potongan harga). Periode yang tersedia tertera di halaman detail kos.',
  },
  {
    kategori: 'pesan-bayar',
    pertanyaan: 'Bagaimana alur memesan kamar kos?',
    kataKunci: 'alur memesan pesan whatsapp tanpa login booking',
    jawaban:
      'Buka halaman detail kos, pilih masa sewa, lalu klik <strong>Lanjut Pesan via WhatsApp</strong>. Pesan otomatis berisi nama kos, periode, dan tanggal masuk akan terbuka di WhatsApp pemilik. Tinggal kirim.',
  },
  {
    kategori: 'pesan-bayar',
    pertanyaan: 'Apakah ada biaya administrasi atau komisi sewa?',
    kataKunci: 'biaya admin komisi gratis biaya sewa',
    jawaban:
      '<strong>Tidak ada.</strong> Layanan KostKu Madiun gratis untuk pencari kos. Tarif kamar adalah tarif dari pemilik tanpa mark-up.',
  },
  {
    kategori: 'pesan-bayar',
    pertanyaan: 'Ke mana pembayaran sewa kos dilakukan?',
    kataKunci: 'pembayaran sewa transfer rekening pemilik tunai',
    jawaban:
      'Langsung kepada pemilik atau pengelola resmi kos (transfer atau tunai). KostKu Madiun tidak menampung uang sewa.',
  },
  {
    kategori: 'pesan-bayar',
    pertanyaan: 'Bisakah saya survei lokasi langsung sebelum membayar?',
    kataKunci: 'survei lokasi langsung lihat kamar sebelum bayar dp',
    jawaban:
      '<strong>Sangat dianjurkan.</strong> Buat janji survei lewat WhatsApp untuk mengecek sirkulasi udara, kebersihan air, sinyal internet, dan lingkungan sekitar sebelum memberi DP.',
  },
  {
    kategori: 'penghuni-aturan',
    pertanyaan: 'Apakah boleh membawa kendaraan? Bagaimana parkirnya?',
    kataKunci: 'parkir motor mobil gerbang kunci aman',
    jawaban:
      'Sebagian besar kos menyediakan parkir motor untuk penghuni. Untuk mobil, gunakan filter fasilitas <em>Parkir Mobil</em> di halaman Cari Kos.',
  },
  {
    kategori: 'penghuni-aturan',
    pertanyaan: 'Bagaimana aturan tamu dan jam malam?',
    kataKunci: 'jam malam aturan tamu gerbang kunci mandiri',
    jawaban:
      'Aturan berbeda tiap kos dan tercantum di halaman detail. Ada kos yang mengunci gerbang pukul 22.00 WIB, ada pula yang memakai kunci mandiri. Tanyakan ke pemilik bila Anda sering pulang malam.',
  },
  {
    kategori: 'pemilik-kos',
    pertanyaan: 'Bagaimana cara mendaftarkan kos saya? Apakah gratis?',
    kataKunci: 'daftarkan kos pemilik gratis iklan pasang listing mitra',
    jawaban:
      'Pendaftaran <strong>gratis</strong> tanpa potongan komisi. Isi formulir di halaman <em>Untuk Pemilik Kos</em> atau kirim foto kamar, fasilitas, dan lokasi ke WhatsApp admin KostKu.',
  },
  {
    kategori: 'pemilik-kos',
    pertanyaan: 'Bagaimana jika ingin memperbarui harga atau sisa kamar?',
    kataKunci: 'update perbarui harga sisa kamar penuh admin',
    jawaban:
      'Kirim chat singkat ke admin KostKu, misalnya <em>"Kost Melati tersisa 1 kamar"</em>. Tim kami akan memperbarui data di website.',
  },
  {
    kategori: 'pemilik-kos',
    pertanyaan: 'Berapa lama proses verifikasi listing kos baru?',
    kataKunci: 'lama proses verifikasi listing tayang publikasi',
    jawaban:
      'Verifikasi alamat dan kurasi foto biasanya maksimal <strong>1×24 jam kerja</strong>, lalu listing langsung tampil di hasil pencarian.',
  },
];
