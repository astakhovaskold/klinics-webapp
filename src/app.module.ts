import {Module} from '@nestjs/common';

import {APP_GUARD} from '@nestjs/core';
import {MongooseModule} from '@nestjs/mongoose';

import {NestjsFormDataModule} from 'nestjs-form-data';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {AccessTokenGuard} from './auth/guards/access-token.guard';
import {RolesGuard} from './common/guards/roles.guard';
import {MediaModule} from './media/media.module';
import {PostsModule} from './posts/posts.module';
import {ProfileModule} from './profile/profile.module';
import {UsersModule} from './users/users.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        NestjsFormDataModule,
        UsersModule,
        AuthModule,
        ProfileModule,
        PostsModule,
        MediaModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {provide: APP_GUARD, useClass: AccessTokenGuard},
        {provide: APP_GUARD, useClass: RolesGuard},
    ],
})
export class AppModule {}
