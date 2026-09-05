import { Request, Response, NextFunction } from 'express';

export function validateChatMessage(req: Request, res: Response, next: NextFunction) {
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      status: 'INVALID_PAYLOAD',
      message: 'Parameter "message" is required and must be a non-empty string.'
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      status: 'INVALID_PAYLOAD',
      message: 'Message exceeds tactical maximum length of 1000 characters.'
    });
  }

  next();
}

export function validateCommandExecution(req: Request, res: Response, next: NextFunction) {
  const { type } = req.body;
  if (!type || typeof type !== 'string') {
    return res.status(400).json({
      status: 'INVALID_PAYLOAD',
      message: 'Command "type" is required.'
    });
  }
  next();
}
