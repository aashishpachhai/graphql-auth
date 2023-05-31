import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refreshtoken.strategy';

@Module({
  imports: [UsersModule],
  providers: [AuthGuard],
})
export class AuthModule {}
