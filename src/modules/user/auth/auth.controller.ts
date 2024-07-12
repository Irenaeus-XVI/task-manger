import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-customer.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @UseGuards(AuthGuard('local'))
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }
}
