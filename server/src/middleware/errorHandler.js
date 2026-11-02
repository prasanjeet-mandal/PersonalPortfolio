export const errorHandler = (err, req, res, next) => {
  // Always log full error server-side for internal diagnostics
  console.error('[SECURITY ERROR LOG]', {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.headers['x-forwarded-for'],
    method: req.method,
    url: req.originalUrl,
    error: err.message,
  });

  const statusCode = err.statusCode || 500;

  // Never leak database or internal system details to external clients
  const isDbError = err.name === 'PrismaClientInitializationError' || 
                    err.name === 'PrismaClientKnownRequestError' ||
                    err.message?.includes('database server');

  const safeMessage = isDbError 
    ? 'Database service is currently unreachable or initializing. Please contact system administrator.'
    : (statusCode === 500 ? 'Internal server error occurred.' : err.message);

  res.status(statusCode).json({
    success: false,
    message: safeMessage,
    ...(process.env.NODE_ENV === 'development' && !isDbError ? { debug: err.message } : {}),
  });
};
