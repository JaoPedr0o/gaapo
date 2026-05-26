import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const usuario = process.env.ADMIN_USER ?? "admin";
  const senha = process.env.ADMIN_PASSWORD ?? "admin123";
  const senhaHash = await bcrypt.hash(senha, 12);

  await prisma.administrador.upsert({
    where: { usuario },
    update: { senhaHash },
    create: { usuario, senhaHash },
  });

  console.log(`✓ Admin criado: ${usuario}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
