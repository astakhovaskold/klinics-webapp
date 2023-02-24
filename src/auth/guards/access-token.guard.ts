/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */

import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {}
