import { HttpStatus } from '@nestjs/common';

export class ServerException extends Error {
  constructor(
    log: string,
    readonly errorMessage: string,
    readonly responseStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(log);
  }
}
