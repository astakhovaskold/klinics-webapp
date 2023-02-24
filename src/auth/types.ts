/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */

import {UserDocument} from '../users/schemas/user.schema';

export interface JwtPayload {
    sub: UserDocument['id'];
    username: UserDocument['username'];
}
