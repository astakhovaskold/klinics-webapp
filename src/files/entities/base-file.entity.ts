/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class BaseFileEntity {
    @ApiModelProperty()
    length: number;

    @ApiModelProperty()
    chunkSize: number;

    @ApiModelProperty()
    filename: string;

    @ApiModelProperty()
    md5: string;

    @ApiModelProperty()
    contentType: string;
}
