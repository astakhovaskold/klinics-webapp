import {Module} from '@nestjs/common';

import {JwtModule} from '@nestjs/jwt';

import {UsersModule} from '../users/users.module';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AccessTokenStrategy} from './strategies/access-token.strategy';
import {RefreshTokenStrategy} from './strategies/refresh-token.strategy';

@Module({
    imports: [JwtModule.register({}), UsersModule],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
