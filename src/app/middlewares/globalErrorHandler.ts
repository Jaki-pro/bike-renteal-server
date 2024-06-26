import { TErrorSources } from '../interface/error';
import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'something went wrong';

  let errorMessages: TErrorSources = [
    {
      path: '',
      message: err?.message || 'Something went wrong',
    },
  ];
  let appError: boolean = false;
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof AppError) {
    appError = true;
    statusCode = err?.statusCode;
    message = err?.message;
  } else if (err instanceof Error) {
    message = err?.message;
  }

  // Customize app Error
  if (!appError) {
    res.status(statusCode).json({
      success: false,
      message: message,
      errorMessages,
      //err,
      stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
  } else if (appError && statusCode === 404) {
    res.status(statusCode).json({
      success: false,
      message: message,
      data: [],
      //err,
      //stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
  } else if (appError && statusCode === 401) {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: message,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: message,
    });
  }
  next();
};
export default globalErrorHandler;
