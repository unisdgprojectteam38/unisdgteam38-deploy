'use server';

// generate mock api request
import { Request, Response } from 'express';

export default function (req: Request, res: Response) {
  res.json({
    data: 'mock data',
  });
}