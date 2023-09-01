import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorDto } from '../interface';
import { getStack } from '@/utils';

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: object & HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { message, error } = exception.getResponse() as {
      message: string;
      error: unknown;
    };

    response.status(status).json({
      success: false,
      code: status,
      errorId: HttpStatus[status],
      error: error,
      stack: getStack(exception),
      message: message ?? 'Internal server error',
      timestamp: new Date().getTime(),
      path: request.url,
    } satisfies ApiErrorDto);
  }
}
