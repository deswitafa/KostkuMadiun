import { LABEL_PERIODE, escapeHtml, formatRupiah, tampilkanNomor } from '../lib/format.js';
import { buatTautanWa, pesanBooking } from '../lib/whatsapp.js';
import { $, $$, ikon } from '../lib/dom.js';

const DURASI = {
  harian: ['1 Hari', '2 Hari', '3 Hari', '7 Hari (1 Minggu)'],
  bulanan: ['1 Bulan', '3 Bulan', '6 Bulan', '12 Bulan (1 Tahun)'],
  tahunan: ['1 Tahun', '2 Tahun'],
};

/**
 * Modal "Kirim Pesan ke Pemilik Kos": pratinjau pesan WhatsApp diperbarui
 * langsung saat formulir diisi.
 * @param {object} kos data kos
 * @param {{periode?: string}} opsi periode awal ('harian' | 'bulanan' | 'tahunan')
 */
export function bukaBookingModal(kos, { periode = 'bulanan' } = {}) {
  const periodeTersedia = Object.keys(LABEL_PERIODE).filter((p) => kos.harga[p]);
  const state = {
    periode: periodeTersedia.includes(periode) ? periode : 'bulanan',
    penghuni: '1 Orang',
  };

  const overlay = document.createElement('div');
  overlay.className = 'modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Kirim pesan ke pemilik kos');
  overlay.innerHTML = `
    <div class="modal__card">
      <div class="modal__head">
        <div>
          <h2>Kirim Pesan ke Pemilik Kos</h2>
          <p>Isi data singkat untuk membuat pesan otomatis ke WhatsApp pengelola.</p>
        </div>
        <button class="icon-btn" type="button" data-tutup aria-label="Tutup">${ikon('close')}</button>
      </div>

      <div class="modal__summary">
        <img src="${kos.gambar[0].src}" alt="">
        <div>
          <strong>${kos.nama}</strong>
          <span>${kos.lokasi.alamat}</span>
        </div>
        <div class="modal__price">
          <div class="segmented" role="tablist" data-periode>
            ${periodeTersedia
              .map((p) => `<button type="button" class="segmented__btn" data-periode-btn="${p}">${LABEL_PERIODE[p]}</button>`)
              .join('')}
          </div>
          <strong data-harga></strong>
        </div>
      </div>

      <div class="form-grid">
        <label class="field"><span>Nama Lengkap Anda *</span>
          <input class="input" data-nama type="text" placeholder="Contoh: Siti Nurhaliza" autocomplete="name"></label>
        <label class="field"><span>Rencana Tanggal Masuk *</span>
          <input class="input" data-tanggal type="text" placeholder="Contoh: 1 September 2027"></label>
        <label class="field"><span>Durasi Sewa</span>
          <select class="input" data-durasi></select></label>
        <div class="field"><span>Jumlah Penghuni</span>
          <div class="segmented segmented--fill">
            <button type="button" class="segmented__btn is-active" data-penghuni="1 Orang">1 Orang</button>
            <button type="button" class="segmented__btn" data-penghuni="2 Orang">2 Orang</button>
          </div></div>
      </div>

      <div class="wa-preview">
        <span class="wa-preview__label">${ikon('mark_chat_unread')} Pratinjau pesan yang akan terkirim</span>
        <p class="wa-bubble" data-pesan></p>
      </div>

      <div class="modal__owner">
        ${ikon('verified_user')}
        <div><strong>Pengelola ${kos.nama}</strong><span>+${kos.kontak.whatsapp} · ${tampilkanNomor(kos.kontak.whatsapp)}</span></div>
        <span class="chip chip--ok">Bebas biaya admin / broker</span>
      </div>

      <div class="modal__actions">
        <a class="btn btn--wa btn--lg" data-kirim href="#" target="_blank" rel="noopener noreferrer">${ikon('chat')}<span>Kirim ke WhatsApp</span></a>
        <button class="btn btn--ghost btn--lg" type="button" data-salin>${ikon('content_copy')}<span>Salin Pesan</span></button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  document.body.classList.add('no-scroll');

  const refs = {
    nama: $('[data-nama]', overlay),
    tanggal: $('[data-tanggal]', overlay),
    durasi: $('[data-durasi]', overlay),
    pesan: $('[data-pesan]', overlay),
    harga: $('[data-harga]', overlay),
    kirim: $('[data-kirim]', overlay),
    salin: $('[data-salin]', overlay),
  };

  function perbarui() {
    const pesan = pesanBooking({
      kos,
      nama: refs.nama.value.trim(),
      tanggal: refs.tanggal.value.trim(),
      durasi: refs.durasi.value,
      penghuni: state.penghuni,
      periode: LABEL_PERIODE[state.periode],
    });
    refs.pesan.textContent = pesan; // textContent: aman dari injeksi HTML
    refs.harga.textContent = formatRupiah(kos.harga[state.periode]);
    refs.kirim.href = buatTautanWa(kos.kontak.whatsapp, pesan);
  }

  function setPeriode(p) {
    state.periode = p;
    refs.durasi.innerHTML = DURASI[p].map((d) => `<option>${escapeHtml(d)}</option>`).join('');
    $$('[data-periode-btn]', overlay).forEach((b) => b.classList.toggle('is-active', b.dataset.periodeBtn === p));
    perbarui();
  }

  const tutup = () => {
    overlay.remove();
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onEsc);
  };
  const onEsc = (e) => e.key === 'Escape' && tutup();
  document.addEventListener('keydown', onEsc);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('[data-tutup]')) return tutup();
    const btnPeriode = e.target.closest('[data-periode-btn]');
    if (btnPeriode) return setPeriode(btnPeriode.dataset.periodeBtn);
    const btnPenghuni = e.target.closest('[data-penghuni]');
    if (btnPenghuni) {
      state.penghuni = btnPenghuni.dataset.penghuni;
      $$('[data-penghuni]', overlay).forEach((b) => b.classList.toggle('is-active', b === btnPenghuni));
      perbarui();
    }
  });
  [refs.nama, refs.tanggal].forEach((el) => el.addEventListener('input', perbarui));
  refs.durasi.addEventListener('change', perbarui);

  refs.salin.addEventListener('click', async () => {
    const label = $('span', refs.salin);
    try {
      await navigator.clipboard.writeText(refs.pesan.textContent);
      label.textContent = 'Tersalin!';
    } catch {
      label.textContent = 'Gagal menyalin';
    }
    setTimeout(() => (label.textContent = 'Salin Pesan'), 2000);
  });

  setPeriode(state.periode);
  refs.nama.focus();
}
