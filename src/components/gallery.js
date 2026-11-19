import { $, $$, ikon } from '../lib/dom.js';

/**
 * Galeri foto: satu foto utama + thumbnail yang bisa diklik.
 * Bila hanya ada satu foto, thumbnail disembunyikan.
 */
export function renderGallery(gambar) {
  const [utama] = gambar;
  const thumbs =
    gambar.length > 1
      ? `<div class="gallery__thumbs">${gambar
          .map(
            (g, i) =>
              `<button class="gallery__thumb ${i === 0 ? 'is-active' : ''}" type="button" data-index="${i}" aria-label="Lihat foto ${i + 1}">
                <img src="${g.src}" alt="${g.alt}" loading="lazy">
              </button>`
          )
          .join('')}</div>`
      : '';

  return `<div class="gallery">
    <div class="gallery__main">
      <img id="gallery-main" src="${utama.src}" alt="${utama.alt}">
      <span class="gallery__badge">${ikon('photo_library')} ${gambar.length} foto</span>
    </div>
    ${thumbs}
  </div>`;
}

export function initGallery(root, gambar) {
  const utama = $('#gallery-main', root);
  root.addEventListener('click', (e) => {
    const thumb = e.target.closest('.gallery__thumb');
    if (!thumb) return;
    const foto = gambar[Number(thumb.dataset.index)];
    utama.src = foto.src;
    utama.alt = foto.alt;
    $$('.gallery__thumb', root).forEach((t) => t.classList.toggle('is-active', t === thumb));
  });
}
