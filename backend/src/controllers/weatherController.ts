import { Request, Response } from 'express';
import { weatherService } from '../services/weatherService';

export async function getWeather(req: Request, res: Response) {
  try {
    const city = req.query.city ? String(req.query.city) : undefined;
    const weather = await weatherService.getWeather(city);
    res.json({
      status: 'SUCCESS',
      data: weather
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}
