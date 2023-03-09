/**
 * Created by ASTAKHOV A.A. on 06.03.2023
 */

import {createParamDecorator, ExecutionContext} from '@nestjs/common';

import {UserFromRequest} from '../../users/types';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserFromRequest => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
});
