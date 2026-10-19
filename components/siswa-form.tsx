
"use client";

import { useEffect, useState } from "react";
import type { Siswa, SiswaInput } from "@/lib/siswa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  siswa?: Siswa | null;
  onSuccess: () => void;
  onCancel?: () => void;
};

const jurusanList = [
  { value: "RPL", label: "RPL - Rekayasa Perangkat Lunak" },
  { value: "TKJ", label: "TKJ - Teknik Komputer dan Jaringan" },
  { value: "Animasi", label: "Animasi" },
  { value: "PSPT", label: "PSPT" },
  { value: "DKV", label: "DKV - Desain Komunikasi Visual" },
  { value: "TE", label: "TE - Teknik Elektronik" },
];

const tingkatList = [
  { value: "10", label: "Kelas 10 (X)" },
  { value: "11", label: "Kelas 11 (XI)" },
  { value: "12", label: "Kelas 12 (XII)" },
];

const romawi: Record<string, string> = {
  "10": "X",
  "11": "XI",
  "12": "XII",
};

export default function SiswaForm({
  siswa,
  onSuccess,
  onCancel,
}: Props) {
  const [form, setForm] = useState<SiswaInput>({
    nama: "",
    kelas: "",
    jurusan: "",
  });

  const [tingkat, setTingkat] = useState("10");
  const [nomorKelas, setNomorKelas] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const kelasLama = siswa?.kelas ?? "";
    const cocok = kelasLama.match(
      /^(XII|XI|X)\s+(.+?)\s+([1-5])$/i
    );

    let tingkatAwal = "10";
    let jurusanAwal = "";
    let nomorAwal = "1";

    if (cocok) {
      tingkatAwal =
        cocok[1].toUpperCase() === "XII"
          ? "12"
          : cocok[1].toUpperCase() === "XI"
            ? "11"
            : "10";

      jurusanAwal = cocok[2];
      nomorAwal = cocok[3];
    } else if (kelasLama) {
      jurusanAwal = kelasLama;
    }

    setTingkat(tingkatAwal);
    setNomorKelas(nomorAwal);

    setForm({
      nama: siswa?.nama ?? "",
      kelas: kelasLama,
      jurusan: jurusanAwal || siswa?.jurusan || "",
    });

    setError("");
  }, [siswa]);

  function ubahForm(field: keyof SiswaInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function ubahJurusan(value: string) {
    setForm((prev) => ({ ...prev, jurusan: value }));
  }

  function ubahTingkat(value: string) {
    setTingkat(value);
  }

  const kelasPilihan =
    form.jurusan && tingkat
      ? `${romawi[tingkat]} ${form.jurusan} ${nomorKelas}`
      : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data: SiswaInput = {
      nama: form.nama.trim(),
      jurusan: form.jurusan,
      kelas: kelasPilihan,
    };

    try {
      const response = await fetch(
        siswa ? `/api/siswa/${siswa.id}` : "/api/siswa",
        {
          method: siswa ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Terjadi kesalahan");
      }

      setForm({ nama: "", kelas: "", jurusan: "" });
      setTingkat("10");
      setNomorKelas("1");
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Nama Siswa
        </label>
        <Input
          value={form.nama}
          onChange={(e) => ubahForm("nama", e.target.value)}
          placeholder="Masukkan nama siswa"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Jurusan
        </label>
        <select
          value={form.jurusan}
          onChange={(e) => ubahJurusan(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Pilih jurusan
          </option>
          {jurusanList.map((jurusan) => (
            <option key={jurusan.value} value={jurusan.value}>
              {jurusan.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Tingkat Kelas
        </label>
        <select
          value={tingkat}
          onChange={(e) => ubahTingkat(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {tingkatList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Rombongan Kelas
        </label>
        <select
          value={nomorKelas}
          onChange={(e) => setNomorKelas(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {[1, 2, 3, 4, 5].map((nomor) => (
            <option key={nomor} value={String(nomor)}>
              {kelasPilihan
                ? `${romawi[tingkat]} ${form.jurusan} ${nomor}`
                : `Kelas ${nomor}`}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-muted-foreground">
          {form.jurusan && tingkat
            ? `Kelas yang dipilih: ${kelasPilihan}`
            : "Pilih jurusan terlebih dahulu."}
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : siswa
              ? "Simpan Perubahan"
              : "Tambah Siswa"}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Batal
          </Button>
        )}
      </div>
    </form>
  );
}
