import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'ayeolakenny@gmail.com',
      name: 'Ayeola Kehinde',
      pin: await argon2.hash('1234'),
      account: {
        create: {
          balance: 100,
          number: '2270757654',
        },
      },
    },
  });

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
