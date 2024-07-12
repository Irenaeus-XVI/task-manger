import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller'
import { UserService } from './user.service';
import { UserRepository } from 'src/models';
import { UserFactoryService } from './factory/user.factory';
import { UserMongoModule } from 'src/shared/modules/user-mongo.modules';

@Module({
  imports: [
    UserMongoModule
  ],
  controllers: [UserController],
  providers: [UserService, UserFactoryService],
  exports: [UserService],
})
export class UserModule { }
