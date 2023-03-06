/**
 * Created by ASTAKHOV A.A. on 06.03.2023
 */

import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log(request.user);
    return request.user;
});
