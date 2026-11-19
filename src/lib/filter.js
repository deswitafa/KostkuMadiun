/**
 * Logika pencarian & filter (lihat architecture bagian 7).
 * Semua fungsi murni: input -> output, tanpa efek samping.
 */

export const FILTER_DEFAULT = Object.freeze({
  q: '',
  tipe: 'semua', // 'semua' | 'putri' | 'putra' | 'campuran'
  periode: 'bulanan', // memengaruhi harga yang ditampilkan di kartu
  min: null,
  max: null,
  fasilitas: [], // semua fasilitas terpilih harus ada (AND)
  tersedia: false, // hanya kos yang masih ada kamar
  urut: 'rekomendasi',
});

/** Baca query string (mis. "?q=melati&min=500000&f=wifi,ac") menjadi objek filter. */
export function bacaParams(search) {
  const p = new URLSearchParams(search);
  const angka = (nilai) => (nilai && /^\d+$/.test(nilai) ? Number(nilai) : null);
  return {
    q: p.get('q') ?? '',
    tipe: p.get('tipe') ?? 'semua',
    periode: p.get('periode') ?? 'bulanan',
    min: angka(p.get('min')),
    max: angka(p.get('max')),
    fasilitas: p.get('f') ? p.get('f').split(',').filter(Boolean) : [],
    tersedia: p.get('tersedia') === '1',
    urut: p.get('urut') ?? 'rekomendasi',
  };
}

/** Tulis objek filter menjadi query string. Nilai default tidak ikut ditulis. */
export function tulisParams(filter) {
  const p = new URLSearchParams();
  if (filter.q) p.set('q', filter.q);
  if (filter.tipe !== 'semua') p.set('tipe', filter.tipe);
  if (filter.periode !== 'bulanan') p.set('periode', filter.periode);
  if (filter.min != null) p.set('min', filter.min);
  if (filter.max != null) p.set('max', filter.max);
  if (filter.fasilitas.length) p.set('f', filter.fasilitas.join(','));
  if (filter.tersedia) p.set('tersedia', '1');
  if (filter.urut !== 'rekomendasi') p.set('urut', filter.urut);
  const hasil = p.toString().replace(/%2C/g, ",");
  return hasil ? `?${hasil}` : '';
}

const cocokKataKunci = (kos, q) => {
  const kata = q.trim().toLowerCase();
  if (!kata) return true;
  const jerami = [kos.nama, kos.lokasi.area, kos.lokasi.alamat, kos.lokasi.kampusTerdekat ?? '']
    .join(' ')
    .toLowerCase();
  return jerami.includes(kata);
};

export function filterKos(daftar, filter) {
  return daftar.filter((kos) => {
    if (!cocokKataKunci(kos, filter.q)) return false;
    if (filter.tipe !== 'semua' && kos.tipe !== filter.tipe) return false;
    if (filter.min != null && kos.harga.bulanan < filter.min) return false;
    if (filter.max != null && kos.harga.bulanan > filter.max) return false;
    if (!filter.fasilitas.every((f) => kos.fasilitas.includes(f))) return false;
    if (filter.tersedia && kos.sisaKamar <= 0) return false;
    return true;
  });
}

export function urutkanKos(daftar, urut) {
  const salinan = [...daftar];
  const aturan = {
    harga_asc: (a, b) => a.harga.bulanan - b.harga.bulanan,
    harga_desc: (a, b) => b.harga.bulanan - a.harga.bulanan,
    kamar_desc: (a, b) => b.sisaKamar - a.sisaKamar,
  };
  return aturan[urut] ? salinan.sort(aturan[urut]) : salinan; // "rekomendasi" = urutan data
}

export const cariKos = (daftar, filter) => urutkanKos(filterKos(daftar, filter), filter.urut);
