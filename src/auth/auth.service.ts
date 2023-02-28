import {HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {ServiceError} from '../common/service.error';
import {UserDocument} from '../users/schemas/user.schema';
import {UsersService} from '../users/users.service';

import {AccountDto} from './dto/account.dto';
import {AuthDto} from './dto/auth.dto';
import {TokenDto} from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(data: AuthDto): Promise<AccountDto> {
        const {username, password} = data;

        const user = await this.usersService.getByUsername(username);

        if (!user) throw new ServiceError('Пользователь не найден');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: passwordToCompare, refresh_token, ...profile} = user;
        const isPassEquals = await bcrypt.compare(password, passwordToCompare);

        if (!isPassEquals) throw new ServiceError('Неверный пароль');

        const tokens = await this.getTokens(user.id);
        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return {
            ...tokens,
            user: profile,
        };
    }

    async refresh(userId: UserDocument['id'], refresh_token: UserDocument['refresh_token']) {
        const user = await this.usersService.getById(userId);

        if (!user || !user.refresh_token) throw new ServiceError('Доступ запрещён', HttpStatus.FORBIDDEN);

        const isRefreshTokenMatch = await bcrypt.compare(refresh_token, user.refresh_token);
        if (!isRefreshTokenMatch) throw new ServiceError('Доступ запрещён', HttpStatus.FORBIDDEN);

        const tokens = await this.getTokens(user.id);
        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: UserDocument['id']) {
        return this.usersService.update(userId, {refresh_token: null});
    }

    async updateRefreshToken(userId: UserDocument['id'], refresh_token: UserDocument['refresh_token']) {
        const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);

        await this.usersService.update(userId, {
            refresh_token: hashedRefreshToken,
        });
    }

    async getTokens(sub: UserDocument['id']): Promise<TokenDto> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '1d',
                },
            ),
        ]);

        return {
            access_token,
            refresh_token,
        };
    }
}