import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;
    const user: any = await this.userService.findbyEmail(email);

    if (user && user.password === password) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
