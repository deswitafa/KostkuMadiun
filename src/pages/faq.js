import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderAccordionItem, initAccordion } from '../components/accordion.js';
import { SITE } from '../data/config.js';
import { FAQ, FAQ_KATEGORI } from '../data/faq.js';
import { $, $$, render, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

const state = { kategori: 'semua', kata: '' };

const cocok = (item) => {
  const kategoriCocok = state.kategori === 'semua' || item.kategori === state.kategori;
  const teks = `${item.pertanyaan} ${item.kataKunci ?? ''}`.toLowerCase();
  return kategoriCocok && teks.includes(state.kata.trim().toLowerCase());
};

function renderTab() {
  const hitung = (id) => (id === 'semua' ? FAQ.length : FAQ.filter((f) => f.kategori === id).length);
  const daftar = [{ id: 'semua', label: 'Semua' }, ...FAQ_KATEGORI];
  render(
    '#faq-tabs',
    daftar
      .map(
        ({ id, label }) =>
          `<button class="faq-tab ${id === state.kategori ? 'is-active' : ''}" type="button" role="tab" data-kategori="${id}">${label}<span>${hitung(id)}</span></button>`
      )
      .join('')
  );
}

function renderDaftar() {
  const hasil = FAQ.filter(cocok);
  render('#faq-list', hasil.map((item) => renderAccordionItem(item)).join(''));
  $('#faq-empty').hidden = hasil.length > 0;
}

siap(() => {
  renderNavbar('faq');
  renderFooter();
  $('#faq-wa').href = buatTautanWa(SITE.waAdmin, 'Halo Admin KostKu Madiun, saya punya pertanyaan.');

  renderTab();
  renderDaftar();
  initAccordion($('#faq-list'));

  $('#faq-search').addEventListener('input', (e) => {
    state.kata = e.target.value;
    renderDaftar();
  });
  $('#faq-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('[data-kategori]');
    if (!tab) return;
    state.kategori = tab.dataset.kategori;
    $$('.faq-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
    renderDaftar();
  });
});
