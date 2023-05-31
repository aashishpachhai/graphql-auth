import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  create(createUserInput: CreateUserInput) {
    try {
      return this.knex
        .table('user')
        .insert({
          username: createUserInput.username,
          password: createUserInput.password,
          email: createUserInput.email,
          phoneNumber: createUserInput.phoneNumber,
        })
        .then((id) => this.findOne(id[0]));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    const user = this.knex.table('user');

    return user;
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    } else {
      const user = await this.knex.table('user').where('id', id);
      return user;
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    try {
      return this.knex
        .table('user')
        .where('id', id)
        .update({
          username: updateUserInput.username,
          password: updateUserInput.password,
          email: updateUserInput.email,
          phoneNumber: updateUserInput.phoneNumber,
        })
        .then(() => this.findOne(id));
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findbyEmail(email: string) {
    return await this.knex.table('user').where('email', email).first();
  }

  async remove(id: number) {
    await this.knex.table('user').where('id', id).del();
    return [{ message: `The user ${id} has been removed successfully ` }];
  }
}
