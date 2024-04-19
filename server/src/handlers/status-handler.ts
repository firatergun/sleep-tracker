import { Request, Response } from 'express';

export const getStatusHandler = (req: Request, res: Response) => {
  res.json({ data: { status: 'OK' } });
};
