import { Request, Response } from 'express';
import { commandExecutorService } from '../services/commandExecutorService';

export async function executeCommand(req: Request, res: Response) {
  try {
    const { type, target, payload } = req.body;
    const result = await commandExecutorService.executeCommand({ type, target, payload });
    res.json({
      status: result.success ? 'SUCCESS' : 'FAILED',
      result
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}
