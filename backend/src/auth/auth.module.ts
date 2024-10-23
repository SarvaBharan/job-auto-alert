import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [JwtStrategy, LocalStrategy],
})
export class AuthModule {}
