import {Body, Controller, Get, Patch, Req} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

import {ProfileDto} from '../users/dto/profile.dto';
import {UserEntity} from '../users/entities/user.entity';
import {UserDocument} from '../users/schemas/user.schema';

import {PasswordResetDto} from './dto/password-reset.dto';

import {ProfileService} from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @ApiResponse({type: ProfileDto})
    @Get()
    async profile(@Req() req: Request): Promise<ProfileDto> {
        return req.user as ProfileDto;
    }

    @ApiResponse({type: UserEntity})
    @Patch('password-reset')
    async passwordReset(@Req() req: Request, @Body() passwordResetDto: PasswordResetDto): Promise<UserDocument> {
        const profile = await this.profile(req);

        return this.profileService.passwordReset(profile.sub, passwordResetDto);
    }
}
