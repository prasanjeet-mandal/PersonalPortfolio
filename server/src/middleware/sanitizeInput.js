/**
 * Sanitize Input Middleware
 * Recursively inspects and sanitizes strings in req.body, req.query, and req.params
 * to prevent Stored & Reflected XSS, HTML injection, and control character exploits.
 */

function cleanString(val) {
  if (typeof val !== 'string') return val;
  return val
    // Remove null bytes
    .replace(/\0/g, '')
    // Strip dangerous script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Neutralize dangerous inline javascript handlers and protocols
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }
  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      clean[key] = cleanString(value);
    } else if (typeof value === 'object' && value !== null) {
      clean[key] = sanitizeObject(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

export const sanitizeInput = (req, res, next) => {
  try {
    if (req.body) req.body = sanitizeObject(req.body);
    if (req.query) req.query = sanitizeObject(req.query);
    if (req.params) req.params = sanitizeObject(req.params);
    next();
  } catch (error) {
    next(error);
  }
};
