/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */

import {SetMetadata} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
