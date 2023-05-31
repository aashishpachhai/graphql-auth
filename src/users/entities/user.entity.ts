import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}
