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

export enum TRANSACTION_TYPE_NUMBER {
    SEND_OLD = 2,
    ISSUE = 3,
    TRANSFER = 4,
    REISSUE = 5,
    BURN = 6,
    EXCHANGE = 7,
    LEASE = 8,
    CANCEL_LEASING = 9,
    CREATE_ALIAS = 10,
    MASS_TRANSFER = 11,
    DATA = 12,
    SET_SCRIPT = 13,
    SPONSORSHIP = 14,
    SET_ASSET_SCRIPT = 15,
    SCRIPT_INVOCATION = 16,
}

export enum SIGN_TYPE {
    AUTH = 1000,
    MATCHER_ORDERS = 1001,
    CREATE_ORDER = 1002,
    CANCEL_ORDER = 1003,
    COINOMAT_CONFIRMATION = 1004,
    ISSUE = 3,
    TRANSFER = 4,
    REISSUE = 5,
    BURN = 6,
    EXCHANGE = 7,
    LEASE = 8,
    CANCEL_LEASING = 9,
    CREATE_ALIAS = 10,
    MASS_TRANSFER = 11,
    DATA = 12,
    SET_SCRIPT = 13,
    SPONSORSHIP = 14,
    SET_ASSET_SCRIPT = 15,
    SCRIPT_INVOCATION = 16,
}
