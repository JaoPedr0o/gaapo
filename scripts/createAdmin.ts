import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const senha = await bcrypt.hash('123456', 10)
  await prisma.admin.create({
    data: {
      usuario: 'admin',
      senhaHash: senha,
    },
  })
  console.log('Admin criado')
}

main()