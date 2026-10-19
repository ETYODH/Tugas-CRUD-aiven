import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { validasiSiswa } from "@/lib/siswa";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, nama, kelas, jurusan, created_at, updated_at
       FROM siswa
       ORDER BY id DESC`
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data siswa" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = {
      nama: String(body.nama ?? ""),
      kelas: String(body.kelas ?? ""),
      jurusan: String(body.jurusan ?? ""),
    };

    const pesanError = validasiSiswa(data);

    if (pesanError) {
      return NextResponse.json(
        { message: pesanError },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO siswa (nama, kelas, jurusan)
       VALUES ($1, $2, $3)
       RETURNING id, nama, kelas, jurusan, created_at, updated_at`,
      [data.nama.trim(), data.kelas.trim(), data.jurusan.trim()]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menambahkan siswa" },
      { status: 500 }
    );
  }
}