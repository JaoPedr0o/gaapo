import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient() // sem nada aqui

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