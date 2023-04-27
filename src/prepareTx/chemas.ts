import { prepare } from './prepare';
import { SIGN_TYPE } from './constants';
import { config, TRANSACTION_TYPE_VERSION } from '@waves/signature-generator';
import * as fieldsType from './fieldTypes';

const { schema, wrap, signSchema, processors } = prepare;

const SIGN_SCHEMA = {
    [SIGN_TYPE.MATCHER_ORDERS]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.AUTH]: [
        fieldsType.string('prefix', null, processors.addValue('WavesWalletAuthentication'), true),
        fieldsType.string('host'),
        fieldsType.string('data'),
    ],
    [SIGN_TYPE.COINOMAT_CONFIRMATION]: [
        fieldsType.string('prefix', null, processors.addValue('Coinomat'), true),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.CREATE_ORDER]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.string('matcherPublicKey'),
        //@ts-ignore
        fieldsType.money('amount', 'amountAsset', processors.moneyToAssetId),
        //@ts-ignore
        fieldsType.money('price', 'priceAsset', processors.moneyToAssetId),
        fieldsType.orderType('orderType'),
        //@ts-ignore
        fieldsType.money('amount', 'amount', processors.toBigNumber),
        //@ts-ignore
        fieldsType.fromData(null, 'price', processors.toOrderPrice),
        //@ts-ignore
        fieldsType.numberLike('matcherFee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('expiration', null, processors.expiration),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
