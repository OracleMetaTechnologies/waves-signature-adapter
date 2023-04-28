import {
    MATCHER_BYTES_GENERATOR_MAP,
    BYTES_GENERATORS_MAP,
    StringWithLength,
    generate,
    ISignatureGeneratorConstructor,
    Int
} from '@waves/signature-generator';
import { IAdapterSignMethods, IAuthData } from './interfaces';
import { binary } from '@waves/marshall';
