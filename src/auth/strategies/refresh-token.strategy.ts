/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */

import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {JwtPayload} from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req, payload: JwtPayload) {
        const refresh_token = req.get('Authorization').replace('Bearer', '').trim();
        return {...payload, refresh_token};
    }
}
