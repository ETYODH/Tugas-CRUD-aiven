import SiswaTable from "@/components/siswa-table";

export default function SiswaPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-2">
        <h1 className="text-3xl font-bold">Data Siswa</h1>
        <p className="text-gray-600">
          Kelola data siswa dengan mudah.
        </p>

        <div className="pt-6">
          <SiswaTable />
        </div>
      </div>
    </main>
  );
}