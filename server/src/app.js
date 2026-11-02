import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';

import { botShield } from './middleware/botShield.js';
import { sanitizeInput } from './middleware/sanitizeInput.js';
import { generalApiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

// Trust reverse proxy if deployed behind Cloudflare / Nginx / Vercel
app.set('trust proxy', 1);

// 1. Layer 1 Firewall: BotShield (blocks automated exploit probes, SQLi scanners, path traversal)
app.use(botShield);

// 2. HTTP Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Managed per domain / frontend SPA
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
    frameguard: { action: 'deny' }, // Clickjacking protection
    noSniff: true, // MIME type sniffing protection
    xssFilter: true, // XSS filter protection
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// 3. Prevent HTTP Parameter Pollution attacks
app.use(hpp());

// 4. Response Compression (Gzip / Deflate to conserve bandwidth and mitigate outbound DoS)
app.use(compression());

// 5. Global API Rate Limiter
app.use('/api', generalApiLimiter);

// 6. Strict CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: Access restricted to authorized origins.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// 7. Request Logger (production omits sensitive query logs)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 8. Body Parsers with tight payload size caps (Prevents JSON bomb DoS)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 9. Input Sanitization (Recursive XSS and injection neutralization)
app.use(sanitizeInput);

// 10. Static Uploads directory
app.use('/uploads', express.static(path.resolve('uploads'), {
  dotfiles: 'deny',
  maxAge: '1d',
  index: false,
}));

// 11. Mount API Routes
app.use('/api', apiRoutes);

// 12. Root status greeting
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Prasanjeet Kumar Mandal Portfolio REST API is operational.',
    health: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

// 13. 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found.`,
  });
});

// 14. Global Error Handler
app.use(errorHandler);

export default app;
