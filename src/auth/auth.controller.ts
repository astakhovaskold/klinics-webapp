import {BadRequestException, Body, Controller, Get, HttpException, Post, Req, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

import {Public} from '../common/decorators/public.decorator';

import {ServiceError} from '../common/service.error';

import {AuthService} from './auth.service';
import {AccountDto} from './dto/account.dto';
import {AuthDto} from './dto/auth.dto';
import {RefreshTokenGuard} from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() data: AuthDto): Promise<AccountDto> {
        try {
            return await this.authService.login(data);
        } catch (e) {
            if (e instanceof ServiceError) throw new HttpException(e.message, e.status);

            throw new BadRequestException(e.message);
        }
    }

    @Post('logout')
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
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
