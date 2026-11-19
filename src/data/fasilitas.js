/**
 * Katalog fasilitas. Kunci (id) dipakai di data kos dan filter.
 * `ikon` mengacu pada nama Material Symbols Outlined.
 */
export const FASILITAS = {
  wifi: { label: 'Wi-Fi', ikon: 'wifi' },
  ac: { label: 'AC', ikon: 'ac_unit' },
  'km-dalam': { label: 'Kamar Mandi Dalam', ikon: 'shower', singkat: 'KM Dalam' },
  'km-bersama': { label: 'Kamar Mandi Bersama', ikon: 'bathtub', singkat: 'KM Bersama' },
  kasur: { label: 'Kasur', ikon: 'bed' },
  lemari: { label: 'Lemari', ikon: 'checkroom' },
  'meja-belajar': { label: 'Meja Belajar', ikon: 'desk' },
  'parkir-motor': { label: 'Parkir Motor', ikon: 'two_wheeler' },
  'parkir-mobil': { label: 'Parkir Mobil', ikon: 'directions_car' },
  dapur: { label: 'Dapur Bersama', ikon: 'soup_kitchen' },
  cctv: { label: 'CCTV', ikon: 'videocam' },
};

/** Fasilitas yang tampil sebagai checkbox di panel filter. */
export const FASILITAS_FILTER = [
  'wifi',
  'ac',
  'km-dalam',
  'lemari',
  'meja-belajar',
  'parkir-motor',
  'parkir-mobil',
];

export const getFasilitas = (id) => FASILITAS[id] ?? { label: id, ikon: 'check' };
