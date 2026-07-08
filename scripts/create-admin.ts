import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@blcil.com";
  const plainPassword = "Admin12345";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log("Admin account created successfully");
  console.log("Email:", email);
  console.log("Password:", plainPassword);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });