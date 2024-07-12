import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserFactoryService {
  async createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;

    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new User();

    newUser.name = updateUserDto.name && updateUserDto.name;
    newUser.email = updateUserDto.email && updateUserDto.email;


    return newUser;
  }
}
