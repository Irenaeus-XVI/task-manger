import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        UserModule,
        AuthModule
    ],
    providers: [

    ],
})
export class UserAppModule { }
