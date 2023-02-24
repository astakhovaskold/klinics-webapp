import {Module} from '@nestjs/common';

import {APP_GUARD} from '@nestjs/core';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {AccessTokenGuard} from './auth/guards/access-token.guard';
import {UsersModule} from './users/users.module';

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_URL), UsersModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, {provide: APP_GUARD, useClass: AccessTokenGuard}],
})
export class AppModule {}
