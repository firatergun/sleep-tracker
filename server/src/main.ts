import { db } from './db/config';

// For Development purposes only, Delete before production deployment !..
async function main() {
    try {
      // Add function to run in terminal
    } catch (error) {
        console.log(error);
    }
}
  
  main()
    .then(async () => {
      await db.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await db.$disconnect()
      process.exit(1)
    })