import rateLimit from 'express-rate-limit';

// Strict Rate limiter for admin login (Prevent Brute-Force & Credential Stuffing)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Strict limit: max 5 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts from this IP address. Access blocked for 15 minutes.',
    });
  },
});

// Rate limiter for contact form submissions (prevent spam & DDoS)
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many contact submissions from this IP. Please try again after 15 minutes.',
    });
  },
});

// General API request limiter (prevent scraping & resource exhaustion)
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
