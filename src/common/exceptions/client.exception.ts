import { HttpStatus } from '@nestjs/common';

export class ClientException extends Error {
  constructor(
    log: string,
    readonly errorMessage: string,
    readonly responseStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(log);
  }
}
