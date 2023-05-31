import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokn {
  @Field()
  access: string;
}
