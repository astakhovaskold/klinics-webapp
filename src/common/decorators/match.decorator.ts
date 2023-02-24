/**
 * Created by ASTAKHOV A.A. on 16.02.2023
 */

import {ClassConstructor} from 'class-transformer';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

export const Match = <T>(
    type: ClassConstructor<T>,
    property: (o: T) => unknown,
    validationOptions?: ValidationOptions,
) => {
    return (object: T, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
};

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint<T> implements ValidatorConstraintInterface {
    validate(value: T, args: ValidationArguments) {
        const [fn] = args.constraints;
        return fn(args.object) === value;
    }

    defaultMessage(args: ValidationArguments) {
        const [constraintProperty]: Array<() => T> = args.constraints;
        return `${constraintProperty} and ${args.property} does not match`;
    }
}
