import { $ } from '../lib/dom.js';

const PESAN = [
  'Tenang, semua kos di KostKu Madiun 100% tanpa biaya admin perantara lho! ✨',
  'Halo! Butuh kos dekat UNIPMA atau Poltek Madiun? Coba filter di halaman Cari Kos ya! 🎓',
  'Mau survei kamar? Langsung klik tombol WhatsApp di kos pilihanmu ya! 💬',
  'Tips: cek sinyal seluler dan ventilasi kamar saat survei siang hari ya! ☀️',
  'Cari kos dengan parkir motor aman? Gunakan filter fasilitas yuk! 🛵',
  'Si Kosty siap menemani cari kos nyaman sampai dapat kuncinya! Semangat! 🌟',
];

/** Maskot "Si Kosty": klik untuk lompat dan ganti pesan, tombol X untuk menutup balon. */
export function initMascot() {
  const wrapper = $('#kosty-wrapper');
  const svg = $('#kosty-svg');
  const teks = $('#kosty-text');
  const balon = $('#kosty-bubble');
  const tutup = $('#kosty-dismiss');
  if (!wrapper) return;

  let indeks = 0;
  wrapper.addEventListener('click', () => {
    svg.classList.remove('is-jumping');
    void svg.getBoundingClientRect(); // restart animasi
    svg.classList.add('is-jumping');
    setTimeout(() => svg.classList.remove('is-jumping'), 700);

    balon.classList.remove('hidden');
    indeks = (indeks + 1) % PESAN.length;
    teks.textContent = PESAN[indeks];
  });

  tutup.addEventListener('click', (e) => {
    e.stopPropagation();
    balon.classList.add('hidden');
  });
}
