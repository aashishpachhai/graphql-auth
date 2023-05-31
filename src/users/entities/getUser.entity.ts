import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetUser {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}
