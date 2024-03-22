import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'accountNumber', passwordField: 'pin' });
  }

  async validate(accountNumber: string, pin: string): Promise<any> {
    const user = await this.authService.validateUser(accountNumber, pin);
    delete user.pin;
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    return user;
  }
}
