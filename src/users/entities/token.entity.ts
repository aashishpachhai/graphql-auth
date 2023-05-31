import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokn {
  @Field()
  access: string;

  @Field()
  refresh: string;
}
