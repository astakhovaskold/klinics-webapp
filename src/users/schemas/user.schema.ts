/**
 * Created by ASTAKHOV A.A. on 15.02.2023
 */

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

import {ROLE} from '../../typings/enums';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true, maxlength: 64})
    nickname: string;

    @Prop({required: true, minlength: 6, maxlength: 64})
    password: string;

    @Prop({maxlength: 64})
    last_name: string;

    @Prop({maxlength: 64})
    first_name: string;

    @Prop({maxlength: 64})
    middle_name: string;

    @Prop({required: true, enum: ROLE})
    role: string;

    @Prop({required: true, default: true})
    is_active: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
