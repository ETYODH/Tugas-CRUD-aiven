import SiswaTable from "@/components/siswa-table"
import { Users, GraduationCap, ClipboardList } from "lucide-react"

export default function SiswaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4">
          <GraduationCap size={28} className="text-blue-600" />

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              SiswaTaruna Bhakti
            </h1>
            <p className="text-sm text-gray-500">Sistem Informasi Data Siswa</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-5 py-8">
        {/* Banner */}
        <section className="rounded-lg bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Data Siswa</h2>
          <p className="mt-2 text-sm text-blue-100">
            Kelola data siswa, kelas, dan jurusan dalam satu tempat.
          </p>
        </section>

        {/* Info Cards */}
        <section className="grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<Users size={22} />}
            label="Manajemen Siswa"
            description="Tambah, lihat, edit, dan hapus data."
          />

          <InfoCard
            icon={<GraduationCap size={22} />}
            label="Pilihan Jurusan"
            description="RPL, TKJ, Animasi, PSPT, DKV, dan TE."
          />

          <InfoCard
            icon={<ClipboardList size={22} />}
            label="Pilihan Kelas"
            description="Kelas 10, 11, dan 12."
          />
        </section>

        {/* Tabel Siswa */}
        <section className="rounded-lg border bg-white">
          <div className="border-b p-5">
            <h3 className="font-bold text-gray-800">Daftar Siswa</h3>
            <p className="mt-1 text-sm text-gray-500">
              Data siswa yang tersimpan di database.
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <SiswaTable />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-2 text-center text-sm text-gray-500">
          SiswaHub · Sistem Informasi Data Siswa
        </footer>
      </div>
    </main>
  )
}

function InfoCard({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode
  label: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
      <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>

      <div>
        <h3 className="font-semibold text-gray-800">{label}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
