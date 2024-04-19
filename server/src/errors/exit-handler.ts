import { httpTerminator, server } from '..';
import { db } from '../db/config';

class ExitHandler {
  public async handleExit(code: number, timeout = 5000): Promise<void> {
    try {
      console.log(`Attempting a graceful shutdown with code ${code}`);

      if (server.listening) {
        console.log('Terminating HTTP connections');
        await httpTerminator.terminate();
      }

      console.log(`Exiting gracefully with code ${code}`);
      db.$disconnect();
      process.exit(code);
    } catch (error) {
      console.log('Error shutting down gracefully');
      console.log(error);
      console.log(`Forcing exit with code ${code}`);
      process.exit(code);
    }
  }
}

export const exitHandler = new ExitHandler();
