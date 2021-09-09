import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(private authService: AuthService) {
    super();
  }

  async validateToken(Token: string): Promise<any> {
    const user = await this.authService.validateToken(Token);
    
    if (!user) {
      throw new UnauthorizedException();
    }

    const { password, token, ...result } = user;

    console.log("Validate Local Strategy")

    return result
  }
}