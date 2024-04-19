import { PrismaClient, Prisma } from '@prisma/client'
import { format, formatISO } from 'date-fns'

const prisma = new PrismaClient()

const userWithSleepData = [
  {
    name: 'Sky',
    gender: 'female',
    sleepData: [
      {
        duration: 5,
        date: '2024-04-10',
      },
      {
        duration: 7,
        date: '2024-04-11',
      },
      {
        duration: 6,
        date: '2024-04-16',
      },
      {
        duration: 4,
        date: '2024-04-12',
      },
      {
        duration: 4,
        date: '2024-04-12',
      },
      {
        duration: 2,
        date: '2024-04-12',
      },
      {
        duration: 2,
        date: '2024-04-14',
      },
      {
        duration: 1,
        date: '2024-04-14',
      },
      {
        duration: 3,
        date: '2024-04-15',
      },
      {
        duration: 9,
        date: '2024-04-15',
      },
      {
        duration: 6,
        date: '2024-04-16',
      },
      {
        duration: 6,
        date: '2024-04-17',
      },
    ]
  }
]

async function main() {
  console.log('Start seeding ...')
  console.log('Seeding SYS_DATE...');
  const sysDate = await prisma.properties.findUnique({
    where: {
      name: 'SYS_DATE'
    },
  });
  if (!sysDate) {
    await prisma.properties.create({ data: { name: "SYS_DATE", value: format(new Date(), 'yyyy-MM-dd') } });
  }
  console.log('Seeding Test User...')
  for (const n of userWithSleepData) {
    const user = await prisma.user.create({
      data: {
        name: n.name,
        gender: n.gender
      }
    });
    for (const s of n.sleepData) {
      await prisma.sleepData.create({
        data: {
          duration: s.duration,
          date: new Date(s.date), //format(new Date(s.date), 'yyyy-MM-dd'),
          userId: user.id,
        }
      });
    }
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })