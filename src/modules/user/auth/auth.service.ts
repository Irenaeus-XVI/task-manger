import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService,
  ) { }

  private readonly logger = new Logger(AuthService.name);

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.UserService.findOne(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { ...omit(user, ['password']) };
    }

    return null;
  }

  public login(user: Express.User) {
    try {
      const { email, _id, phoneNumber, countryCode, type } = user as User;
      const payload = {
        _id,
        email,
        countryCode,
        phoneNumber,
        type,
      };
      return {
        user: payload,
        accessToken: this.signJwt(payload),
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public signJwt(payload) {
    return this.jwtService.sign(payload);
  }
}
