import { SignUpRequestDto } from '../dtos/sign-up-request.dto';

export class SignUpCommand {
  constructor(readonly request: SignUpRequestDto) {}
}
