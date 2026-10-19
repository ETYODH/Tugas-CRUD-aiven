
import SiswaTable from "@/components/siswa-table";
import {
  Users,
  GraduationCap,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";

export default function SiswaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <GraduationCap size={25} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Siswa<span className="text-blue-600">Taruna Bhakti</span>
              </h1>
              <p className="text-xs text-slate-500">
                Sistem Informasi Data Siswa
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-700">
              Dashboard Aktif
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 sm:py-10">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-9">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Panel Administrasi
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Data Siswa
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100 sm:text-base">
              Kelola data siswa, kelas, dan jurusan dalam satu tempat.
              Praktis, rapi, dan mudah digunakan.
            </p>
          </div>

          <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute right-8 top-8 hidden opacity-20 sm:block">
            <GraduationCap size={130} strokeWidth={1} />
          </div>
        </section>

        {/* Info cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<Users size={21} />}
            label="Manajemen Siswa"
            description="Tambah, lihat, edit, dan hapus data."
            color="blue"
          />
          <InfoCard
            icon={<GraduationCap size={21} />}
            label="6 Pilihan Jurusan"
            description="RPL, TKJ, Animasi, PSPT, DKV, dan TE."
            color="violet"
          />
          <InfoCard
            icon={<ClipboardList size={21} />}
            label="Kelas 10–12"
            description="Pilihan kelas."
            color="emerald"
          />
        </section>

        {/* Student table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Daftar Siswa
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Data siswa yang tersimpan di database.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Terhubung ke database
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <SiswaTable />
          </div>
        </section>

        <footer className="pb-3 text-center text-xs text-slate-400">
          SiswaTarunaBahkti · Sistem Informasi Data Siswa
        </footer>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  description,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: "blue" | "violet" | "emerald";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[color]}`}>
          {icon}
        </div>
        <ArrowUpRight
          size={18}
          className="text-slate-300 transition-colors group-hover:text-blue-600"
        />
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{label}</h3>
      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}
