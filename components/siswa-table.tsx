"use client";

import { useEffect, useState } from "react";
import type { Siswa } from "@/lib/siswa";
import SiswaForm from "@/components/siswa-form";
import { Button } from "@/components/ui/button";

export default function SiswaTable() {
  const [data, setData] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pilihanEdit, setPilihanEdit] = useState<Siswa | null>(null);

  async function muatData() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/siswa", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memuat data");
      }

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat data"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void muatData();
  }, []);

  async function hapusSiswa(id: number) {
    if (!window.confirm("Yakin ingin menghapus data siswa ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/siswa/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus siswa");
      }

      if (pilihanEdit?.id === id) {
        setPilihanEdit(null);
      }

      await muatData();
    } catch (err) {
      window.alert(
        err instanceof Error ? err.message : "Gagal menghapus siswa"
      );
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          {pilihanEdit ? "Edit Data Siswa" : "Tambah Data Siswa"}
        </h2>

        <SiswaForm
          key={pilihanEdit?.id ?? "baru"}
          siswa={pilihanEdit}
          onSuccess={() => {
            setPilihanEdit(null);
            void muatData();
          }}
          onCancel={
            pilihanEdit ? () => setPilihanEdit(null) : undefined
          }
        />
      </section>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Daftar Siswa</h2>
          <Button variant="outline" onClick={() => void muatData()}>
            Muat Ulang
          </Button>
        </div>

        {loading ? (
          <p>Memuat data siswa...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500">Belum ada data siswa.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3">No.</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Kelas</th>
                  <th className="p-3">Jurusan</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {data.map((siswa, index) => (
                  <tr key={siswa.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{siswa.nama}</td>
                    <td className="p-3">{siswa.kelas}</td>
                    <td className="p-3">{siswa.jurusan}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPilihanEdit(siswa)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => void hapusSiswa(siswa.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}