/**
 * Created by ASTAKHOV A.A. on 16.02.2023
 */

import {PaginationParams} from '../common/types';

export enum ROLE {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    HR = 'HR',
}

export interface UserPagination extends PaginationParams {
    show_inactive: string;
}
