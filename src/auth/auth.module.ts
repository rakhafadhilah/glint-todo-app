import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UserGuard } from './guard/User.guard';
import { TokenStrategy } from './strategy/token.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
        secret: 'SECRET',
        signOptions: {expiresIn: '1d'}
    }),
    PassportModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, TokenStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
