import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Unhandled error at ${req.method} ${req.url}:`, err.message || err);

  res.status(err.status || 500).json({
    status: 'ERROR',
    code: 'JARVIS_CORE_FAULT',
    message: err.message || 'An internal diagnostics fault occurred in the JARVIS mainframe.',
    timestamp: new Date().toISOString()
  });
}
