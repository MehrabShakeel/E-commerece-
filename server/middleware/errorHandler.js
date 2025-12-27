// Helper function to create error objects
function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
  error.isOperational = true;
  return error;
}

// Error helper functions - simple functions that create errors
export function badRequest(message) {
  return createError(message || 'Bad Request', 400);
}

export function unauthorized(message) {
  return createError(message || 'Unauthorized', 401);
}

export function forbidden(message) {
  return createError(message || 'Forbidden', 403);
}

export function notFound(message) {
  return createError(message || 'Resource not found', 404);
}

export function conflict(message) {
  return createError(message || 'Resource already exists', 409);
}

// Main error handler - handles all errors
export function errorHandler(err, req, res, next) {
  // Set default status code if not set
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  // In development, show detailed error information
  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      success: false,
      status: status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }

  // In production, only show safe error messages
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      status: status,
      message: err.message
    });
  }

  // For unexpected errors, don't expose details
  console.error('ERROR:', err);
  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong!'
  });
}

// Handle 404 - when route is not found
export function notFoundRoute(req, res, next) {
  const error = notFound(`Cannot find ${req.originalUrl} on this server`);
  next(error);
}
