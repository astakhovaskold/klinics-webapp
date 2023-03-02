/**
 * Created by ASTAKHOV A.A. on 02.03.2023
 */

import {SetMetadata} from '@nestjs/common';

import {ROLE} from '../../users/types';

export const Roles = (...roles: Array<ROLE>) => SetMetadata('roles', roles);
