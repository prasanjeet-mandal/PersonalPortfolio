import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

/**
 * ANTI-DOS & ANTI-SLOWLORIS HARDENING:
 * 1. server.timeout: Closes idle sockets held open without data (Prevents Slowloris attack).
 * 2. server.keepAliveTimeout: Recycles HTTP keep-alive sockets quickly.
 * 3. server.headersTimeout: Max time allowed to receive HTTP request headers. Must be > keepAliveTimeout.
 * 4. server.maxHeadersCount: Caps max header lines to prevent HTTP header flood.
 */
server.timeout = 15000;         // 15 seconds request timeout
server.keepAliveTimeout = 5000; // 5 seconds keep-alive
server.headersTimeout = 6000;   // 6 seconds headers receive timeout
server.maxHeadersCount = 100;   // Max 100 headers per request

// Start server
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Portfolio REST API Server running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📑 Health: http://localhost:${PORT}/api/health`);
  console.log(`🛡️  Security: Shield, Slowloris, BruteForce, HPP Active`);
  console.log(`🛡️  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=======================================================`);
});

/**
 * HIGH-AVAILABILITY & CRASH PREVENTION:
 * Unhandled exceptions and promise rejections are safely logged and absorbed
 * to prevent the Node.js process from crashing or restarting in an outage loop.
 */
process.on('uncaughtException', (err) => {
  console.error('CRITICAL [Uncaught Exception]:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('CRITICAL [Unhandled Promise Rejection]:', reason);
});

// Graceful Shutdown
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down HTTP server cleanly...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force close if lingering connections keep it alive
  setTimeout(() => {
    console.error('Force closing open connections after 10s timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
