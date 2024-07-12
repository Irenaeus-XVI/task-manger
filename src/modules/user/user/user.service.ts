import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { omit } from 'lodash';
import { User, UserRepository } from '../../../models';
import { message } from 'src/common/constants/message.constatns';

@Injectable()
export class UserService {
  constructor(private UserRepository: UserRepository) { }

  private readonly logger = new Logger(UserService.name);

  public async create(User: User) {
    try {
      const UserExists = await this.UserRepository.exists({
        $or: [{ email: User.email }],
      });

      if (UserExists) {
        throw new ConflictException(message.user.AlreadyExists);
      }

      await this.UserRepository.create(User);

      const userCreated = await this.findOne(User.email);

      if (!userCreated) {
        throw new BadRequestException('Failed to create User');
      }

      return omit(userCreated, ['password']) as unknown as User;
    } catch (error) {
      this.logger.error('--Error--', error);
      throw error;
    }
  }

  public async findOne(email: string) {
    try {
      return await this.UserRepository.getOne({ email });
    } catch (error) {
      this.logger.error('--Error--', error);
      throw new BadRequestException(error);
    }
  }
}
