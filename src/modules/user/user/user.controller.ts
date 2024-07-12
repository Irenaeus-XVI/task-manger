import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { CreateResponse } from '../../../common/dto/response.dto';
import { User } from '../../../models/User/User.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserFactoryService } from './factory/user.factory';

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
    private readonly UserFactoryService: UserFactoryService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const createUserResponse = new CreateResponse<User>();
    try {
      const User = await this.UserFactoryService.createNewUser(
        createUserDto,
      );
      const createdUser = await this.UserService.create(User);
      createUserResponse.success = true;
      createUserResponse.data = createdUser;
    } catch (error) {
      createUserResponse.success = false;
      throw error;
    }
    return createUserResponse;
  }
}
