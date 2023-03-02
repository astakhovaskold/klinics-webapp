/**
 * Created by ASTAKHOV A.A. on 02.03.2023
 */

import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

import {UserDocument} from '../../users/schemas/user.schema';
import {ROLE} from '../../users/types';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canHasAccess(roles: Array<ROLE>, userRole: UserDocument['role']): boolean {
        return roles.includes(userRole);
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Array<ROLE>>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: UserDocument = request.user;
        return this.canHasAccess(roles, user.role);
    }
}
