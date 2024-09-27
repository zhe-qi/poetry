import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { unstable_cache } from "next/cache";

const getPoetrySchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  title: z.string().optional(),
});

export type GetPoetryParams = z.infer<typeof getPoetrySchema>;

export const getCachedPoetry = unstable_cache(
  async (params: GetPoetryParams) => {
    const req = getPoetrySchema.parse(params);
    const where: Record<string, unknown> = {};

    if (req.title) {
      where.title = {
        contains: req.title,
      };
    }

    const [total, data] = await Promise.all([
      db.poetry.count({ where }),
      db.poetry.findMany({
        skip: (req.page - 1) * req.pageSize,
        take: req.pageSize,
        where,
        select: {
          id: true,
          title: true,
          writer: true,
          content: true,
        },
      }),
    ]);

    return {
      data,
      total,
    };
  },
  ["poetry"],
  { revalidate: 3600, tags: ["poetry"] },
);
