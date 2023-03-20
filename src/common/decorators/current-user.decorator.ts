/**
 * Created by ASTAKHOV A.A. on 06.03.2023
 */

import {createParamDecorator, ExecutionContext} from '@nestjs/common';

import {ProfileDto} from '../../users/dto/profile.dto';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): ProfileDto => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
});
