import { Server as SocketIOServer, Socket } from 'socket.io';
import { systemMonitorService } from '../services/systemMonitorService';
import { hardwareTelemetryService } from '../services/hardwareTelemetryService';
import { logger } from '../utils/logger';

export function setupWebSocket(io: SocketIOServer) {
  logger.info('Initializing Socket.IO Real-Time HUD Server...');

  // Broadcast suit telemetry whenever the hardware service produces a packet
  hardwareTelemetryService.on('telemetry', (telemetry) => {
    io.emit('suit:telemetry', telemetry);
  });

  // Background interval for system stats emission
  const sysInterval = setInterval(async () => {
    try {
      const stats = await systemMonitorService.getSystemStats();
      io.emit('system:update', stats);
    } catch (err: any) {
      logger.warn(`Error broadcasting system update: ${err.message}`);
    }
  }, 2000);

  io.on('connection', (socket: Socket) => {
    logger.hud(`HUD Terminal connected: [${socket.id}] from ${socket.handshake.address}`);

    // Send immediate initial state
    systemMonitorService.getSystemStats().then((stats) => {
      socket.emit('system:update', stats);
    });
    socket.emit('suit:telemetry', hardwareTelemetryService.getTelemetry());
    socket.emit('jarvis:status', {
      status: 'ONLINE',
      mode: 'ASSISTANT',
      connectedAt: new Date().toISOString()
    });

    // Handle incoming telemetry from physical ESP32 or client simulations
    socket.on('hardware:telemetry', (data: any) => {
      logger.hud(`Ingested hardware packet from [${socket.id}]`);
      hardwareTelemetryService.ingestHardwarePacket(data);
    });

    socket.on('disconnect', (reason) => {
      logger.hud(`HUD Terminal disconnected: [${socket.id}] Reason: ${reason}`);
    });
  });

  return () => {
    clearInterval(sysInterval);
  };
}
