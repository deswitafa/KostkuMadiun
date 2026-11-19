import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderKosCard } from '../components/kos-card.js';
import { SITE } from '../data/config.js';
import { KOS } from '../data/kos.js';
import { FASILITAS_FILTER, getFasilitas } from '../data/fasilitas.js';
import { bacaParams, cariKos, tulisParams } from '../lib/filter.js';
import { parseRupiah } from '../lib/format.js';
import { $, $$, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

/** Filter aktif disimpan di URL agar hasil bisa dibagikan: /kos.html?q=melati&f=wifi,ac */
let filter = bacaParams(window.location.search);

const formatInput = (angka) => (angka == null ? '' : angka.toLocaleString('id-ID'));

/** Tulis nilai filter ke semua kontrol di panel (dipanggil saat awal & reset). */
function sinkronkanKontrol() {
  $('#search-input').value = filter.q;
  $('#sort-select').value = filter.urut;
  $('#filter-min').value = formatInput(filter.min);
  $('#filter-max').value = formatInput(filter.max);
  $('#filter-tersedia').checked = filter.tersedia;
  $$('input[name="tipe"]').forEach((r) => (r.checked = r.value === filter.tipe));
  $$('[data-periode]').forEach((b) => b.classList.toggle('is-active', b.dataset.periode === filter.periode));
  $$('#filter-fasilitas input').forEach((c) => (c.checked = filter.fasilitas.includes(c.value)));
}

function renderHasil() {
  const hasil = cariKos(KOS, filter);
  $('#results-count').textContent = `${hasil.length} kos ditemukan`;

  render(
    '#results-grid',
    hasil.length
      ? hasil.map((kos) => renderKosCard(kos, { periode: filter.periode })).join('')
      : `<div class="empty-state">${ikon('travel_explore')}
          <h3>Tidak ada kos yang cocok</h3>
          <p>Coba ubah kata kunci, rentang harga, atau kurangi fasilitas yang dipilih.</p>
          <button class="btn btn--sky btn--sm" type="button" id="empty-reset">Reset Filter</button>
        </div>`
  );

  // Simpan ke URL tanpa memuat ulang halaman
  history.replaceState(null, '', `${window.location.pathname}${tulisParams(filter)}`);
}

function perbarui(perubahan) {
  filter = { ...filter, ...perubahan };
  renderHasil();
}

function resetFilter() {
  filter = bacaParams('');
  sinkronkanKontrol();
  renderHasil();
}

function pasangEvent() {
  $('#search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    perbarui({ q: $('#search-input').value });
  });
  $('#search-input').addEventListener('input', (e) => perbarui({ q: e.target.value }));
  $('#sort-select').addEventListener('change', (e) => perbarui({ urut: e.target.value }));
  $('#filter-tersedia').addEventListener('change', (e) => perbarui({ tersedia: e.target.checked }));
  $('#filter-reset').addEventListener('click', resetFilter);
  $('#results-grid').addEventListener('click', (e) => e.target.closest('#empty-reset') && resetFilter());

  $('#filter-tipe').addEventListener('change', (e) => perbarui({ tipe: e.target.value }));
  $('#filter-periode').addEventListener('click', (e) => {
    const tombol = e.target.closest('[data-periode]');
    if (!tombol) return;
    $$('[data-periode]').forEach((b) => b.classList.toggle('is-active', b === tombol));
    perbarui({ periode: tombol.dataset.periode });
  });

  ['min', 'max'].forEach((kunci) => {
    const input = $(`#filter-${kunci}`);
    input.addEventListener('input', () => {
      const nilai = parseRupiah(input.value);
      input.value = formatInput(nilai); // tampilkan dengan pemisah ribuan
      perbarui({ [kunci]: nilai });
    });
  });

  $('#filter-fasilitas').addEventListener('change', () => {
    const dipilih = $$('#filter-fasilitas input:checked').map((c) => c.value);
    perbarui({ fasilitas: dipilih });
  });

  $('#filter-open').addEventListener('click', () => $('#filter-panel').classList.toggle('is-open'));
}

siap(() => {
  renderNavbar('kos');
  renderFooter();

  render(
    '#filter-fasilitas',
    FASILITAS_FILTER.map(
      (id) => `<label class="check"><input type="checkbox" value="${id}"><span>${getFasilitas(id).label}</span></label>`
    ).join('')
  );

  $('#help-wa').href = buatTautanWa(SITE.waAdmin, 'Halo Admin KostKu Madiun, saya butuh bantuan mencari kos.');

  sinkronkanKontrol();
  pasangEvent();
  renderHasil();
});
