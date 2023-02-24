/**
 * Created by ASTAKHOV A.A. on 28.02.2023
 */

import {UserDocument} from '../../users/schemas/user.schema';

import {TokenDto} from './token.dto';

export class AccountDto extends TokenDto {
    user: Partial<UserDocument>;
}
