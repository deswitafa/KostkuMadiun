/**
 * Data contoh untuk Dasbor Pemilik (demo, tanpa login/backend).
 * `kosId` merujuk ke kos.js; kos tanpa `kosId` adalah contoh listing yang menunggu verifikasi.
 */
export const PEMILIK_DEMO = {
  nama: 'Bu Ning',
  properti: [
    { kosId: 'bu-ning-kos-cowok-madiun', status: 'aktif', jumlahFoto: 8 },
    {
      status: 'verifikasi',
      jumlahFoto: 6,
      nama: 'Griya Melati Asri Putri',
      tipe: 'putri',
      alamat: 'Jl. Merpati Gg. 3, Taman (Dekat UNIPMA)',
      harga: { harian: null, bulanan: 800000, tahunan: 8800000 },
      sisaKamar: 3,
    },
  ],
  verifikasi: [
    { label: 'Pendaftaran Akun', selesai: true },
    { label: 'Verifikasi WhatsApp', selesai: true },
    { label: 'Survei Lokasi Fisik', selesai: true },
    { label: 'Mitra Prioritas Unggulan', selesai: false },
  ],
};
