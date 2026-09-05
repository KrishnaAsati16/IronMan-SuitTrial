import { Request, Response } from 'express';
import { systemMonitorService } from '../services/systemMonitorService';

export async function getSystemStats(req: Request, res: Response) {
  try {
    const stats = await systemMonitorService.getSystemStats();
    res.json({
      status: 'SUCCESS',
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}
