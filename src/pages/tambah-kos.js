import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderKosCard } from '../components/kos-card.js';
import { SITE } from '../data/config.js';
import { FASILITAS } from '../data/fasilitas.js';
import { LABEL_TIPE, formatRupiah, parseRupiah, persenHematTahunan } from '../lib/format.js';
import { $, $$, ikon, render, siap } from '../lib/dom.js';
import { buatTautanWa } from '../lib/whatsapp.js';

const KUNCI_DRAFT = 'kostku:tambah-kos:draft';
const FOTO_KOSONG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420"><rect width="100%" height="100%" fill="#e8f0fc"/><text x="50%" y="50%" text-anchor="middle" fill="#8a96ac" font-family="sans-serif" font-size="22">Foto menyusul</text></svg>'
  );

const form = () => $('#form-kos');
const hargaInput = ['hargaHarian', 'hargaBulanan', 'hargaTahunan'];

/* ---------- Baca & simpan nilai formulir ---------- */
function bacaForm() {
  const data = Object.fromEntries(new FormData(form()));
  data.fasilitas = $$('#facility-picks input:checked').map((c) => c.value);
  return data;
}

function isiForm(data) {
  Object.entries(data).forEach(([nama, nilai]) => {
    if (nama === 'fasilitas') return;
    const el = form().elements[nama];
    if (!el) return;
    if (el instanceof RadioNodeList) el.value = nilai;
    else el.value = nilai;
  });
  (data.fasilitas ?? []).forEach((id) => {
    const c = $(`#facility-picks input[value="${id}"]`);
    if (c) c.checked = true;
  });
}

function simpanDraft() {
  try {
    localStorage.setItem(KUNCI_DRAFT, JSON.stringify(bacaForm()));
    $('#draft-status').hidden = false;
  } catch {
    /* penyimpanan diblokir: abaikan */
  }
}

function muatDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(KUNCI_DRAFT));
    if (draft) {
      isiForm(draft);
      $('#draft-status').hidden = false;
    }
  } catch {
    /* tidak ada draft */
  }
}

/* ---------- Data -> objek kos untuk pratinjau ---------- */
function buatKosDraft(data) {
  const angka = (nama) => parseRupiah(data[nama]);
  return {
    id: 'draft',
    nama: data.nama?.trim() || 'Nama Kos Anda',
    tipe: data.tipe || 'campuran',
    lokasi: { area: data.area?.trim() || 'Madiun', alamat: data.alamat ?? '' },
    harga: { harian: angka('hargaHarian'), bulanan: angka('hargaBulanan') ?? 0, tahunan: angka('hargaTahunan') },
    sisaKamar: Math.max(0, Number(data.sisaKamar) || 0),
    fasilitas: data.fasilitas ?? [],
    gambar: [{ src: FOTO_KOSONG, alt: 'Foto kos menyusul' }],
  };
}

function perbaruiPratinjau() {
  const data = bacaForm();
  const kos = buatKosDraft(data);
  render('#preview-card', renderKosCard(kos).replace(/href="detail\.html\?id=draft"/g, 'href="#" tabindex="-1"'));

  const hemat = persenHematTahunan(kos.harga);
  $('#hint-hemat').textContent = hemat ? `Hemat ${hemat}% dibanding bayar per bulan.` : '';
}

/* ---------- Validasi ---------- */
const NOMOR_WA = /^(\+?62|0)8\d{8,12}$/;

function validasi(data) {
  const e = {};
  if ((data.nama ?? '').trim().length < 5) e.nama = 'Nama kos minimal 5 karakter.';
  if (!data.tipe) e.tipe = 'Pilih jenis peruntukan penghuni.';
  if ((data.alamat ?? '').trim().length < 10) e.alamat = 'Isi alamat selengkap mungkin.';
  if (!(data.area ?? '').trim()) e.area = 'Isi area atau kecamatan.';
  if (data.mapsUrl && !/^https?:\/\//.test(data.mapsUrl)) e.mapsUrl = 'Tautan harus diawali http:// atau https://';
  if (!NOMOR_WA.test((data.whatsapp ?? '').replace(/[\s-]/g, ''))) e.whatsapp = 'Masukkan nomor WhatsApp yang valid.';
  if (!parseRupiah(data.hargaBulanan)) e.hargaBulanan = 'Tarif bulanan wajib diisi.';
  const total = Number(data.totalKamar);
  if (!(total >= 1)) e.totalKamar = 'Minimal 1 kamar.';
  const sisa = Number(data.sisaKamar);
  if (!(sisa >= 0)) e.sisaKamar = 'Isi 0 jika penuh.';
  else if (total >= 1 && sisa > total) e.sisaKamar = 'Sisa kamar tidak boleh melebihi total kamar.';
  return e;
}

function tampilkanError(errors) {
  $$('[data-error-for]').forEach((el) => (el.textContent = errors[el.dataset.errorFor] ?? ''));
  const pertama = Object.keys(errors)[0];
  if (pertama) $(`[name="${pertama}"]`, form())?.focus();
}

/* ---------- Pesan WhatsApp ke admin ---------- */
function buatPesan(data) {
  const harga = ['hargaHarian', 'hargaBulanan', 'hargaTahunan']
    .filter((k) => parseRupiah(data[k]))
    .map((k) => `${k.replace('harga', '')}: ${formatRupiah(parseRupiah(data[k]))}`)
    .join(', ');
  const fasilitas = data.fasilitas.map((id) => FASILITAS[id].label).join(', ') || '-';
  return [
    'Halo Admin KostKu Madiun, saya ingin menambahkan kos baru:',
    `Nama kos: ${data.nama}`,
    `Jenis: ${LABEL_TIPE[data.tipe]}`,
    `Alamat: ${data.alamat} (${data.area})`,
    data.mapsUrl ? `Maps: ${data.mapsUrl}` : '',
    `WhatsApp pengelola: ${data.whatsapp}`,
    `Tarif: ${harga}`,
    `Kamar: sisa ${data.sisaKamar} dari ${data.totalKamar}`,
    `Fasilitas: ${fasilitas}`,
    data.peraturan ? `Peraturan:\n${data.peraturan}` : '',
    'Foto kos akan saya kirim menyusul.',
  ]
    .filter(Boolean)
    .join('\n');
}

function tampilkanSukses(tautan) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `<div class="modal__card modal__body--center">
    ${ikon('check_circle', 'icon-lg')}
    <h2>Pesan Pendaftaran Siap Dikirim</h2>
    <p>Lanjutkan di WhatsApp untuk mengirim data ke admin. Tim kami memverifikasi alamat dan nomor kontak dalam 1x24 jam.</p>
    <a class="btn btn--wa" href="${tautan}" target="_blank" rel="noopener noreferrer">${ikon('chat')}Buka WhatsApp</a>
    <button class="btn btn--ghost" type="button" data-tutup>Tutup</button>
  </div>`;
  const tutup = () => modal.remove();
  modal.addEventListener('click', (e) => (e.target === modal || e.target.closest('[data-tutup]')) && tutup());
  document.addEventListener('keydown', function esc(e) {
    if (e.key !== 'Escape') return;
    tutup();
    document.removeEventListener('keydown', esc);
  });
  document.body.append(modal);
}

function kirim(e) {
  e.preventDefault();
  const data = bacaForm();
  const errors = validasi(data);
  tampilkanError(errors);
  if (Object.keys(errors).length) return;
  tampilkanSukses(buatTautanWa(SITE.waAdmin, buatPesan(data)));
}

/* ---------- Mulai ---------- */
siap(() => {
  renderNavbar('pemilik');
  renderFooter();

  render(
    '#facility-picks',
    Object.entries(FASILITAS)
      .map(([id, f]) => `<label class="check"><input type="checkbox" value="${id}"><span>${f.label}</span></label>`)
      .join('')
  );

  muatDraft();
  perbaruiPratinjau();

  form().addEventListener('input', (e) => {
    if (hargaInput.includes(e.target.name)) {
      const nilai = parseRupiah(e.target.value);
      e.target.value = nilai == null ? '' : nilai.toLocaleString('id-ID');
    }
    perbaruiPratinjau();
  });
  form().addEventListener('change', perbaruiPratinjau);
  form().addEventListener('submit', kirim);
  $('#btn-draft').addEventListener('click', simpanDraft);
});
