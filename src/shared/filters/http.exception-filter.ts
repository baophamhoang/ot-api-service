import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorDto } from '../types';
import { getStack } from '@/utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { errorId, message, error } = exception.getResponse() as {
      errorId: string;
      message: string;
      error: unknown;
    };

    response.status(status).json({
      success: false,
      code: status,
      errorId: errorId ?? HttpStatus[status],
      error,
      stack: getStack(exception),
      message,
      timestamp: new Date().getTime(),
      path: request.url,
    } satisfies ApiErrorDto);
  }
}
