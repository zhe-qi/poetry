import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);

  const [data, total] = await db.$transaction([
    db.poetry.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.poetry.count(),
  ]);

  return NextResponse.json({ data, total });
}
