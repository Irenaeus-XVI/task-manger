import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller'
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserRepository, UserSchema } from 'src/models';
import { UserFactoryService } from './factory/user.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserFactoryService, UserRepository],
  exports: [UserService],
})
export class UserModule { }
