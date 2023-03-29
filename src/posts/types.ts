/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */
import {Express} from 'express';

export enum POST_TYPES {
    REALISTIC_3D = 'Realistic 3D',
    STYLIZED_3D = 'Stylized 3D',
    ANIMATION_SPINE = 'Animation/Spine',
    VFX = 'VFX',
    '2D_ART' = '2D art',
    CONCEPT_ART = 'Concept Art',
}

export interface PostFileList {
    thumbnail: Express.Multer.File;
    media: Array<Express.Multer.File>;
}
