import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { passportStrategy } from './stratigies/passport.strategy';
import { LocalStrategy } from './stratigies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { USER_PRIVATE_KEY, USER_PUBLIC_KEY } =
          configService.get('access');
        return {
          privateKey: Buffer.from(USER_PRIVATE_KEY, 'base64').toString(
            'ascii',
          ),
          publicKey: Buffer.from(USER_PUBLIC_KEY, 'base64').toString('ascii'),
          signOptions: {
            expiresIn: '1y',
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, passportStrategy],
})
export class AuthModule {}
