import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Error } from './entities/error.entity';
import { Tokn } from './entities/token.entity';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from './entities/getUser.entity';
import { AccessTokn } from './entities/accesstoken.entity';
import { RefreshJwtStrategy } from 'src/auth/refreshtoken.strategy';
import { RefreshJwtAuthGuard } from 'src/auth/refresh-jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => [User])
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findByemail(@Args({ name: 'email', type: () => String }) email: string) {
    return this.userService.findbyEmail(email);
  }

  @Query(() => [User], { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => [User])
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => [Error])
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Query(() => Tokn)
  @UseGuards(AuthGuard)
  login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    let payload = {
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
    };

    const access = this.jwtService.sign(payload);
    const refresh = this.jwtService.sign(payload, {
      expiresIn: '60d',
      secret: 'abbbbbc',
    });
    return { access, refresh };
  }

  @Query(() => AccessTokn)
  @UseGuards(RefreshJwtAuthGuard)
  getTokenbyRefresh(
    @Args({
      name: 'refresh',
      type: () => String,
    })
    refresh: string,
    @Context() ctx,
  ) {
    const access = this.jwtService.sign(ctx.req.user);

    return { access };
  }

  @Query(() => GetUser)
  @UseGuards(JwtAuthGuard)
  getuserbyToken(@Context() ctx) {
    return ctx.req.user;
  }
}
