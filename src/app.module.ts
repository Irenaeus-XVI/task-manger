import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './common/config/envs/index'
import { UserAppModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').url,
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      }),
    }),
    UserAppModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
