import { Request, Response } from 'express';
import { hardwareTelemetryService } from '../services/hardwareTelemetryService';

export function getSuitTelemetry(req: Request, res: Response) {
  try {
    const telemetry = hardwareTelemetryService.getTelemetry();
    res.json({
      status: 'SUCCESS',
      data: telemetry
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}

export function postHardwareTelemetry(req: Request, res: Response) {
  try {
    hardwareTelemetryService.ingestHardwarePacket(req.body);
    res.json({
      status: 'SUCCESS',
      message: 'Hardware telemetry packet ingested successfully.'
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'ERROR',
      message: error.message
    });
  }
}

export function toggleReactor(req: Request, res: Response) {
  try {
    const overdrive = hardwareTelemetryService.toggleOverdrive();
    res.json({
      status: 'SUCCESS',
      overdrive,
      message: overdrive ? 'Arc reactor overdrive engaged' : 'Arc reactor nominal'
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}

export function toggleHelmet(req: Request, res: Response) {
  try {
    const helmet = hardwareTelemetryService.toggleHelmet();
    res.json({
      status: 'SUCCESS',
      helmet,
      message: helmet ? 'Helmet locked' : 'Helmet open'
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}
