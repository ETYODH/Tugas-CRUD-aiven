import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { validasiSiswa } from "@/lib/siswa";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT id, nama, kelas, jurusan, created_at, updated_at
       FROM siswa WHERE id = $1`,
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data siswa" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

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
      `UPDATE siswa
       SET nama = $1,
           kelas = $2,
           jurusan = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, nama, kelas, jurusan, created_at, updated_at`,
      [
        data.nama.trim(),
        data.kelas.trim(),
        data.jurusan.trim(),
        Number(id),
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengedit data siswa" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "DELETE FROM siswa WHERE id = $1 RETURNING id",
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Data siswa berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menghapus data siswa" },
      { status: 500 }
    );
  }
}