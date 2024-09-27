import { PrismaClient } from "@prisma/client";
// @ts-expect-error 无法解析模块
import { guwen1 } from "./data/guwen0-1000.ts";
// @ts-expect-error 无法解析模块
import { guwen2 } from "./data/guwen1001-2000.ts";

const prisma = new PrismaClient();

async function main() {
  const data = [...guwen1, ...guwen2];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await prisma.poetry.createMany({
    data
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
