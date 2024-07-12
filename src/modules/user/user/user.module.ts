import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller'
import { UserService } from './user.service';
import { UserFactoryService } from './factory/user.factory';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';

@Module({
  imports: [
    UserMongoModule
  ],
  controllers: [UserController],
  providers: [UserService, UserFactoryService],
  exports: [UserService],
})
export class UserModule { }
