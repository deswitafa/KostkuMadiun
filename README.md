# KostKu Madiun

Situs pencarian kos di Kota Madiun. Dibuat dengan **HTML, CSS, dan JavaScript murni** (tanpa framework, tanpa build). Data berupa file statis dan kontak lewat WhatsApp, sesuai batasan MVP di `02-architecture.md`.

## Cara menjalankan

Kode memakai ES Modules, jadi halaman harus dibuka lewat server HTTP, bukan dengan klik ganda (`file://`).

```bash
npm run dev          # npx serve . -l 5173
# atau tanpa npm:
npm run dev:python   # python3 -m http.server 5173
```

Buka `http://localhost:5173`.

## Struktur folder

```
kostku-madiun/
├─ index.html          Beranda
├─ kos.html            Daftar kos + pencarian + filter   (/kos)
├─ detail.html         Detail kos, ?id=<id kos>          (/kos/:id)
├─ tentang.html        Tentang Kami                      (/tentang)
├─ kontak.html         Kontak                            (/kontak)
├─ faq.html            Tanya jawab
├─ pemilik.html        Informasi & pendaftaran pemilik kos
├─ dasbor.html         Contoh dasbor pemilik (data demo)
├─ tambah-kos.html     Formulir tambah kos
├─ public/images/      Foto kos lokal (opsional)
└─ src/
   ├─ data/            Data statis (kos, fasilitas, faq, config, pemilik, dasbor)
   ├─ components/      Potongan UI: navbar, footer, kos-card, gallery, accordion, booking-modal, mascot
   ├─ pages/           Satu file JS per halaman HTML
   ├─ lib/             Logika murni: filter, format, whatsapp, dom
   └─ css/             base, layout, components, main.css (+ pages/ per halaman)
```

Pemetaan dari arsitektur awal: `src/types` diganti komentar skema di `src/data/kos.js` karena proyek ini tidak memakai TypeScript.

## Alur data

1. `src/data/kos.js` berisi array `KOS`.
2. `kos.js` (halaman) membaca filter dari URL (`kos.html?q=melati&min=500000&max=1000000&f=wifi,ac`), memanggil `cariKos()` di `lib/filter.js`, lalu merender `renderKosCard()`.
3. `detail.html?id=...` mencari kos dengan `getKosById()`.
4. Tombol kontak membuat tautan `https://wa.me/<nomor>?text=...` lewat `lib/whatsapp.js`.

Parameter URL filter: `q` (kata kunci), `tipe`, `periode`, `min`, `max`, `f` (fasilitas, dipisah koma), `tersedia`, `urut`.

Aturan filter: kata kunci mencocokkan nama, area, dan alamat; harga memakai tarif bulanan; fasilitas bersifat AND; opsi "hanya yang tersedia" menyembunyikan kos penuh.

## Menambah kos

Tambahkan objek baru di `src/data/kos.js` (skema ada di komentar atas file). Field dengan tanda `?` opsional, dan halaman detail otomatis menyembunyikan bagian yang datanya kosong. Nomor WhatsApp memakai format `62xxxxxxxxxx`. Kontak admin dan menu ada di `src/data/config.js`.

## Catatan

- Foto contoh masih memakai tautan eksternal. Untuk produksi, letakkan foto (WebP) di `public/images/` dan ubah `src` di data.
- Dasbor dan formulir tambah kos adalah demo frontend: tidak ada login atau penyimpanan ke server. Formulir mengirim data ke admin lewat WhatsApp; draft dan sisa kamar tersimpan di `localStorage` browser.
- Bila login ditambahkan nanti, gunakan layanan auth siap pakai dan jangan menyimpan password sendiri.
