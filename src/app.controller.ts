import {Controller, Get, Req, UseGuards} from '@nestjs/common';

import {Request} from 'express';

import {AccessTokenGuard} from './auth/guards/access-token.guard';

@Controller()
export class AppController {
    @UseGuards(AccessTokenGuard)
    @Get('profile')
    async profile(@Req() req: Request) {
        return req.user;
    }
}
