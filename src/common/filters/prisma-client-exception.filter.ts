import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2000': {
        const status = HttpStatus.BAD_REQUEST;
        return response.status(status).json({
          statusCode: status,
          message: 'Bad Request',
        });
        break;
      }

      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        return response.status(status).json({
          statusCode: status,
          message: 'Conflict',
        });
        break;
      }

      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        return response.status(status).json({
          statusCode: status,
          message: 'Not Found',
        });
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
