/**
 * Data 6 listing kos (statis, sesuai batasan MVP: tanpa backend).
 *
 * Skema satu kos:
 *  id, nama, tipe ('putri' | 'putra' | 'campuran'),
 *  lokasi   { area, alamat, kampusTerdekat?, mapsUrl, jarak? },
 *  harga    { harian|null, bulanan, tahunan|null },
 *  sisaKamar (0 = penuh), fasilitas [id dari fasilitas.js],
 *  kontak   { whatsapp (format 62xxxxxxxxxx) },
 *  gambar   [{ src, alt }],
 *  deskripsi? [paragraf], peraturan? [{ ikon, judul, isi }], ringkasan? [{ ikon, label, nilai }]
 *
 * Field bertanda `?` bersifat opsional; halaman detail menyembunyikan
 * bagian yang datanya tidak ada.
 */
export const KOS = [
  {
    id: 'ichi-kost-putri',
    nama: 'ICHI Kost Putri',
    tipe: 'putri',
    lokasi: {
      area: 'Taman',
      alamat: 'Jl. Merpati No. 12, Taman, Kota Madiun, Jawa Timur 63131',
      kampusTerdekat: '3 mnt ke UNIPMA',
      mapsUrl: 'https://maps.google.com/?q=ICHI+Kost+Putri+Madiun',
      jarak: [
        { label: 'Kampus UNIPMA Madiun', waktu: '3 Menit', jarak: '350 m' },
        { label: 'Politeknik Negeri Madiun', waktu: '5 Menit', jarak: '1,2 km' },
        { label: 'Stasiun Kereta Madiun', waktu: '7 Menit', jarak: '2,4 km' },
      ],
    },
    harga: { harian: 75000, bulanan: 850000, tahunan: 9000000 },
    termasuk: 'Sudah termasuk biaya listrik, air & Wi-Fi',
    sisaKamar: 3,
    nomorKamar: ['04', '07', '09'],
    fasilitas: ['wifi', 'ac', 'km-dalam', 'lemari', 'parkir-motor', 'kasur', 'meja-belajar', 'dapur', 'cctv'],
    kontak: { whatsapp: '6281331270921' },
    gambar: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA14nbbq5UFW-zAJq199jEqUtmHjCtnaShWn_NlOALOC3swwmXBTTq9ckgTCtLZue0wS8VQYjtRmDIl9r7-F7TCCIWjt_hHy0iNEov0sOAjMGLL0ZbsdAfyx33prsDX52qvdeV3GePfQGt-SGF0hhM3TLj-BJLj_9mZHO9yiig4nIN0V5iIsgzwiNFfxlTY21FPNyRVAWOWhejCLQ9VPQyd-urqD66cvjgf6XDgd3w', alt: 'Fasad modern ICHI Kost Putri' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4JvXyPq0AbxoSsrbg6_Puo99Qeh9KIduUcoamg8v3bwhdmPN0ZgGEiN4kGqxKoSLf9B1zZyUazB8MFjrqa295klezLjE-7NCCWHiFEGCJ6qjZhf-V1ie-RTLQf6Z4dI-BkaI0TrYlsoqg_0RAdb_4Y8RRevrOG4vEZUpSI0KnvX19__pq0KVHbDuZpXy5tA0Aqr7kLNYSBdvwbhhggHNJRYaXQQ7WZ6b080Rh0JM', alt: 'Kamar tidur bernuansa modern minimalis' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdv2nSRymcHicFjWHjmbT3itdfOa1e77mpAGTS8LutIVO8Y1rI86FJvg46wBMdia5XKKxBGdiioF7KKrdmHIH81zLOrXT5Ie1hhXNWOVOlDPhwCtYBJtUE3Bi7LQBjKkTguWsRVmi0PVKT6ko07oxwH0N8Fae-CxBSi5yaB7K5Ieo2_CYYCBI1sGOCqMM9URThLVREzbqbmuZpA7Zjrqo8299lHcaHK-XEDq4uGV8', alt: 'Kamar mandi dalam yang bersih' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS7DiSJ3GGBZUHB79wE79cx-JmHtwetp6IxhLnkYeIBM5fBf2Ji7v-yQAOjOtlkhomek-cF3s6klqOeWO43aV0oL-w7JXQ5hy10dAemlWk56ruL7-B6EjXuD_Fa5GNir5Qvgqo_LI9qocY_4V63c44fDwM9-B9rc2R5ebowXwdH8M5l5LcPhe5T0vDlv7nX86Pqg4sPRwFxCiqdABovpHih3HNREvrAYC-yme6Suc', alt: 'Sudut meja belajar' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaHtk727i7Cm-by7eqAhUZa0yP1yGnHjtTyYOIvDWIUHQnBEn6SNauOPnX9mJHZG8-8tZGitrkIWvjC9FwuYyskswhum2WpfsTlHLvOK3CQ6zNcf4N2pwr520maFoCabz4pzud-M2nss4yoHPNmFb65NPV1Di3vWVST48WqI3MW0ZVdN_sURaoZtcrZsXZJLzTlS6nwxo2qLxtfn_HD6UTnWYkWA4mH7DT68WL44E', alt: 'Dapur bersama' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ODI8ZVwNoNsbJ5EXI919RIDUw3iFVmsi1eUALvSIPsd_Lp1ee66rKM3NuySFqLpGMvGGGk_stSb3h_7vXjXNWp9UsacRupqDhHcTNNrBa7lx9Y6UWFcMSkR5Wt8jXGkSe_PLcler58F1YQDAZJ94TNZEvNRGE32Vl9G4X192t36veeBg_GQm9a1wBckvADbVmkZ__6IoLmiO_GMBaC-Fn91tl7iGFhq7NE7OAa0', alt: 'Area parkir motor beratap' },
    ],
    ringkasan: [
      { ikon: 'aspect_ratio', label: 'Ukuran Kamar', nilai: '3 × 3,5 Meter' },
      { ikon: 'wb_twilight', label: 'Sirkulasi', nilai: 'Jendela Luar' },
      { ikon: 'bolt', label: 'Listrik', nilai: 'Termasuk Listrik' },
      { ikon: 'schedule', label: 'Jam Gerbang', nilai: 'Kunci Mandiri' },
    ],
    deskripsi: [
      'ICHI Kost Putri Madiun adalah hunian yang dirancang untuk kenyamanan mahasiswi UNIPMA, perantau, maupun karyawati muda yang mengutamakan rasa aman dan ketenangan belajar.',
      'Setiap kamar mendapat sirkulasi udara alami dan cahaya matahari yang baik. Lokasinya di kawasan pemukiman yang tenang di Kecamatan Taman, hanya 350 meter dari gerbang UNIPMA.',
      'Kebutuhan harian mudah dijangkau: dalam radius 100 meter ada warung makan, laundry kiloan, fotokopi, apotek, dan minimarket. Dilengkapi gerbang kunci mandiri dan CCTV.',
    ],
    peraturan: [
      { ikon: 'lock_clock', judul: 'Jam Malam Gerbang', isi: 'Gerbang utama ditutup 22.00 WIB. Akses pulang malam menggunakan kunci gerbang mandiri.' },
      { ikon: 'group', judul: 'Kunjungan Tamu', isi: 'Tamu lawan jenis hanya diperkenankan bertamu di ruang tamu umum lantai 1.' },
      { ikon: 'smoke_free', judul: 'Bebas Asap Rokok', isi: 'Dilarang merokok / vape di dalam kamar maupun koridor tertutup.' },
      { ikon: 'eco', judul: 'Peduli Kebersihan & Energi', isi: 'Menjaga kebersihan area bersama (dapur & jemuran) serta mematikan AC saat keluar kamar.' },
    ],
  },
  {
    id: 'kost-cendana-madiun',
    nama: 'Kost Cendana Madiun',
    tipe: 'campuran',
    lokasi: {
      area: 'Kartoharjo',
      alamat: 'Kartoharjo, Kota Madiun',
      kampusTerdekat: 'Dekat UNIPMA',
      mapsUrl: 'https://maps.google.com/?q=Kost+Cendana+Madiun',
    },
    harga: { harian: null, bulanan: 900000, tahunan: null },
    sisaKamar: 5,
    fasilitas: ['wifi', 'ac', 'km-dalam', 'meja-belajar'],
    kontak: { whatsapp: '6285735800440' },
    gambar: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nuHtt0gz_FRz20UNanCkxmY1DG4XqX4fAj28zysqXiA3X43tm095Q7fA7lNthgEu6P4Ic474SDR6BBTCLx9vHy9F4KYd_GcyIc8H7jOp-IGHeZAWEaTiw2l5ZoGZGC1TgCkTwZOBdjUm4qWzyUfmi2zO8ZbxydFAPB8NZvz_LzveY2nAxB4I6Cabmgies5Fs2cENrSt2qhsFcieKINYaf8T-y8D6sX5dxeMGxPo', alt: 'Kamar bernuansa kayu modern Kost Cendana Madiun' }],
  },
  {
    id: 'kos-kosan-abimanyu-2',
    nama: 'Kos Kosan Abimanyu 2',
    tipe: 'campuran',
    lokasi: {
      area: 'Manguharjo',
      alamat: 'Jl. Abimanyu, Manguharjo, Kota Madiun',
      mapsUrl: 'https://maps.google.com/?q=Kos+Abimanyu+2+Madiun',
    },
    harga: { harian: null, bulanan: 750000, tahunan: null },
    sisaKamar: 1,
    fasilitas: ['wifi', 'km-bersama', 'kasur', 'parkir-motor'],
    kontak: { whatsapp: '628155614653' },
    gambar: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ3KoEeSFeAHIkVPas7aa-J-U8zQE02VN-XBB8_GvwKgl7qT_fNSvwgll-4c9B-s2y2jSzO73dBwnqixrdezFYpTWcB5AE2TGOUdCdKOs2hFFRbHdp8ECF2IwXsvobG-DOLWQEBy1rHPpl5O4pJmUj4OHQxNXpefefzBlVCnuPY97d-PA1tAEcu3XqJJs_MFmN021p-CZqnT9OiwG2GlCpsweSica2LHR1V7gmsk', alt: 'Area umum dan lorong asri Kos Kosan Abimanyu 2' }],
  },
  {
    id: 'bu-ning-kos-cowok-madiun',
    nama: 'Bu Ning Kos Cowok Madiun',
    tipe: 'putra',
    lokasi: {
      area: 'Kartoharjo',
      alamat: 'Jl. Serayu No. 12, Kartoharjo, Kota Madiun',
      kampusTerdekat: 'Dekat Poltek Madiun',
      mapsUrl: 'https://maps.google.com/?q=Bu+Ning+Kos+Cowok+Madiun',
    },
    harga: { harian: 65000, bulanan: 700000, tahunan: 7500000 },
    sisaKamar: 2,
    fasilitas: ['wifi', 'kasur', 'lemari', 'meja-belajar', 'parkir-motor'],
    kontak: { whatsapp: '6281555675555' },
    gambar: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJcqoL6vFbonM3Nk8a6EfSXxk7StwGIrBp43ZOfUAFCVEauSXRhgwsmW-p3Ut-hek2gKtL3Rbpn1J79cIwDBBPmDRNKl_ElfRFqXBydbjUkEBnDFWCR5ErH-qQBYMJ_oZJpH0xqHx2eVctp1UTK2YngMKH4ok71w2OFnOLfmXmzUBm7aAQNcAU71CeauN6AyzqRSkiqFqIf_97EPp1hVYyidV22-cp_K-V6s8aqM4', alt: 'Kamar rapi dengan meja belajar di Bu Ning Kos Cowok' }],
  },
  {
    id: 'kost-pria-sirsat-01-madiun',
    nama: 'Kost Pria Sirsat 01 Madiun',
    tipe: 'putra',
    lokasi: {
      area: 'Taman',
      alamat: 'Jl. Sirsat, Taman, Kota Madiun',
      mapsUrl: 'https://maps.google.com/?q=Kost+Pria+Sirsat+01+Madiun',
    },
    harga: { harian: null, bulanan: 800000, tahunan: null },
    sisaKamar: 0,
    fasilitas: ['wifi', 'ac', 'kasur', 'parkir-motor'],
    kontak: { whatsapp: '6282266085555' },
    gambar: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUVPReMxBa0LzS_7bsdeYp3OvPKUAONVrxWCrwR1rtr3lX-R9npnZwzZjkuqPmV9dfOKIwXi1bxaM6KxUAsTlPDwHfHgmZkxpIn9bFyiM5Xi8mAgAA5_r5x33ZHMf2pWs8V6QaJpByDYq_EQUF6jMoDC06A6eQL29nMcsf8RMxKEDeRaYmTqHm3FSFLRrcizC_Fi5RbhmM9em0roBDjLFGrzzTAqns6wyA7Ld8YMI', alt: 'Fasad Kost Pria Sirsat 01 di Taman, Madiun' }],
  },
  {
    id: 'griya-kos-putri-kurnia',
    nama: 'Griya Kos Putri Kurnia',
    tipe: 'putri',
    lokasi: {
      area: 'Manguharjo',
      alamat: 'Manguharjo, Kota Madiun',
      kampusTerdekat: 'Dekat Politeknik',
      mapsUrl: 'https://maps.google.com/?q=Griya+Kos+Putri+Kurnia+Madiun',
    },
    harga: { harian: null, bulanan: 950000, tahunan: null },
    sisaKamar: 4,
    fasilitas: ['wifi', 'ac', 'dapur', 'cctv'],
    kontak: { whatsapp: '6281234488388' },
    gambar: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG_B1uw954myvZsHbkRA8MF6poZLhsGIvpB6Ft5qrhdh9zarrMP7P1DqxG9IoLgB5tsyoJvzMN3gDNLCvKoa-W-x1pVjJFWHmPc-IDiBfBzvhCIr9OhdpK_7bFUiuJkdV04WQtGgvMyUYRpfDhrJ4ysNfJCGwMkF1x1sJUNWITXwpSha1PbNC0HSgv6_Oj7FxV1wlR9Jaokrcj0XN6jqz9kOrm4k1AJH4U_sjlmHg', alt: 'Dapur bersama dan area santai Griya Kos Putri Kurnia' }],
  },
];

export const getKosById = (id) => KOS.find((kos) => kos.id === id);
