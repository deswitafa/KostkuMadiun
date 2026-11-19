import { $$, ikon } from '../lib/dom.js';

/**
 * Render satu item akordeon.
 * @param {{pertanyaan:string, jawaban:string, kataKunci?:string}} item
 */
export function renderAccordionItem(item, terbuka = false) {
  return `<div class="accordion__item ${terbuka ? 'is-open' : ''}" data-keywords="${item.kataKunci ?? ''}">
    <button class="accordion__toggle" type="button" aria-expanded="${terbuka}">
      <span>${item.pertanyaan}</span>${ikon('expand_more', 'accordion__icon')}
    </button>
    <div class="accordion__content" ${terbuka ? '' : 'hidden'}>${item.jawaban}</div>
  </div>`;
}

/** Aktifkan buka/tutup untuk semua akordeon di dalam `root` (delegasi event). */
export function initAccordion(root) {
  root.addEventListener('click', (e) => {
    const tombol = e.target.closest('.accordion__toggle');
    if (!tombol || !root.contains(tombol)) return;
    const item = tombol.closest('.accordion__item');
    const terbuka = item.classList.toggle('is-open');
    tombol.setAttribute('aria-expanded', String(terbuka));
    item.querySelector('.accordion__content').hidden = !terbuka;
  });
  return $$('.accordion__item', root);
}
