import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <section className="w-full max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">
          SISTEM INFORMASI SEKOLAH
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Sistem Data Siswa
        </h1>

        <p className="mt-3 leading-7 text-gray-500">
          Aplikasi sederhana untuk mengelola data siswa.
        </p>

        <Link
          href="/siswa"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
        >
          Kelola Data Siswa
        </Link>
      </section>
    </main>
  )
}
