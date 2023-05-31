import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RefreshJwtStrategy } from 'src/auth/refreshtoken.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'a',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [UsersResolver, UsersService, JwtStrategy, RefreshJwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
