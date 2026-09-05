import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { config } from './config';
import { logger } from './utils/logger';
import apiRouter from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import { setupWebSocket } from './websocket/socketHandler';
import { hardwareTelemetryService } from './services/hardwareTelemetryService';

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  if (!req.url.startsWith('/api/system') && !req.url.startsWith('/api/suit/status')) {
    logger.info(`${req.method} ${req.url}`);
  }
  next();
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

// Setup WebSockets
setupWebSocket(io);

// Start Hardware Telemetry Simulation
if (config.telemetry.enableSimulation) {
  hardwareTelemetryService.startSimulation(config.telemetry.intervalMs);
}

// Start Server
server.listen(config.port, () => {
  logger.info(`=======================================================`);
  logger.info(`  IRON MAN SUIT — JARVIS BACKEND CORE INITIALIZED     `);
  logger.info(`  PORT: ${config.port} | ENV: ${config.nodeEnv}        `);
  logger.info(`  AI PROVIDER: ${config.ai.provider.toUpperCase()}     `);
  logger.info(`  SOCKET.IO: ACTIVE & STREAMING TELEMETRY              `);
  logger.info(`=======================================================`);
});

export { app, server, io };
