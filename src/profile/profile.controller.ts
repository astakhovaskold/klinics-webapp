import {Body, Controller, Get, Patch, Req} from '@nestjs/common';
import {Request} from 'express';

import {UserDocument} from '../users/schemas/user.schema';

import {UserFromRequest} from '../users/types';

import {PasswordResetDto} from './dto/password-reset.dto';

import {ProfileService} from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    async profile(@Req() req: Request): Promise<UserFromRequest> {
        return req.user as UserFromRequest;
    }

    @Patch('password-reset')
    async passwordReset(@Req() req: Request, @Body() passwordResetDto: PasswordResetDto): Promise<UserDocument> {
        const profile = await this.profile(req);

        return this.profileService.passwordReset(profile.sub, passwordResetDto);
    }
}
