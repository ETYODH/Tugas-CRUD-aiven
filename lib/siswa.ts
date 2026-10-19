export type Siswa = {
  id: number;
  nama: string;
  kelas: string;
  jurusan: string;
  created_at?: string;
  updated_at?: string;
};

export type SiswaInput = {
  nama: string;
  kelas: string;
  jurusan: string;
};

export function validasiSiswa(data: SiswaInput) {
  if (!data.nama.trim()) return "Nama wajib diisi";
  if (!data.kelas.trim()) return "Kelas wajib diisi";
  if (!data.jurusan.trim()) return "Jurusan wajib diisi";

  return null;
}