/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */
import {HttpStatus} from '@nestjs/common';

export class ServiceError extends Error {
    message: string;
    status?: number;

    constructor(message, status = HttpStatus.BAD_REQUEST) {
        super();

        this.message = message;
        this.status = status;
    }
}
