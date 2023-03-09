/**
 * Created by ASTAKHOV A.A. on 16.02.2023
 */
import {UserDocument} from './schemas/user.schema';
import {PaginationParams} from "../common/types";

export enum ROLE {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    HR = 'HR',
}

export interface UserFromRequest {
    sub: UserDocument['id'];
    iat: Date;
    exp: Date;
}

export interface UserPagination extends PaginationParams {
    show_inactive: string;
}
