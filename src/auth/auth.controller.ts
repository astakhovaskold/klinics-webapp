import {BadRequestException, Body, Controller, HttpException, Post, Req, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

import {Public} from '../common/decorators/public.decorator';

import {ServiceError} from '../common/error';

import {AuthService} from './auth.service';
import {AuthDto} from './dto/auth.dto';
import {TokenDto} from './dto/token.dto';
import {AccessTokenGuard} from './guards/access-token.guard';
import {RefreshTokenGuard} from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() data: AuthDto): Promise<TokenDto> {
        try {
            return await this.authService.login(data);
        } catch (e) {
            if (e instanceof ServiceError) throw new HttpException(e.message, e.status);

            throw new BadRequestException(e.message);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    async refresh(@Req() req: Request) {
        const userId = req.user['sub'];
        const refresh_token = req.user['refresh_token'];

        try {
            return await this.authService.refresh(userId, refresh_token);
        } catch (e) {
            if (e instanceof ServiceError) throw new HttpException(e.message, e.status);

            throw new BadRequestException(e.message);
        }
    }
}
