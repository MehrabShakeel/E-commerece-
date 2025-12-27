// Create error object with status code
const createError = (message, statusCode, errors = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  error.isOperational = true;

  if (errors) {
    error.errors = errors;
  }

  return error;
};

// Error creation functions
export const badRequest = (message = 'Bad Request', errors = null) => {
  return createError(message, 400, errors);
};

export const unauthorized = (message = 'Unauthorized') => {
  return createError(message, 401);
};

export const forbidden = (message = 'Forbidden') => {
  return createError(message, 403);
};

export const notFound = (message = 'Resource not found') => {
  return createError(message, 404);
};

export const conflict = (message = 'Resource already exists') => {
  return createError(message, 409);
};

export const validationError = (message = 'Validation failed', errors = {}) => {
  return createError(message, 400, errors);
};

// Central Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Development error response
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // Production error response
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors })
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error('ERROR 💥', err);

  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong!'
  });
};

// Handle async errors
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Handle 404 Not Found route
export const notFoundRoute = (req, res, next) => {
  const err = notFound(`Can't find ${req.originalUrl} on this server!`);
  next(err);
};
