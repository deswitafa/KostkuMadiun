/** Helper DOM kecil agar kode halaman tetap ringkas. */

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Ikon Material Symbols. */
export const ikon = (nama, kelas = '') =>
  `<span class="material-symbols-outlined ${kelas}" aria-hidden="true">${nama}</span>`;

/** Ganti isi elemen (selector atau elemen) dengan HTML. */
export function render(target, html) {
  const el = typeof target === 'string' ? $(target) : target;
  if (el) el.innerHTML = html;
  return el;
}

/** Jalankan callback setelah DOM siap. */
export const siap = (callback) =>
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', callback)
    : callback();
