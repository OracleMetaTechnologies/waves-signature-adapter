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
[SIGN_TYPE.CANCEL_ORDER]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.string('id', 'orderId'),
    ],
    [SIGN_TYPE.ISSUE]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.assetName('name'),
        fieldsType.assetDescription('description'),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        //@ts-ignore
        fieldsType.numberLike('quantity', null, processors.toBigNumber),
        fieldsType.precision('precision'),
        fieldsType.boolean('reissuable'),
        //@ts-ignore
        fieldsType.script('script', null, processors.orString, true),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.REISSUE]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        fieldsType.asset('assetId'),
        //@ts-ignore
        fieldsType.numberLike('quantity', null, processors.toBigNumber),
        fieldsType.boolean('reissuable'),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.EXCHANGE]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        fieldsType.fromData('buyOrder'),
        fieldsType.fromData('sellOrder'),
        //@ts-ignore
        fieldsType.numberLike('amount', 'amount', processors.toBigNumber),
        //@ts-ignore
        fieldsType.numberLike('price', 'price', processors.toBigNumber),
        //@ts-ignore
        fieldsType.numberLike('buyMatcherFee', 'buyMatcherFee', processors.toBigNumber),
        //@ts-ignore
        fieldsType.numberLike('sellMatcherFee', 'sellMatcherFee', processors.toBigNumber)
    ],
    [SIGN_TYPE.BURN]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        fieldsType.asset('assetId'),
        //@ts-ignore
        fieldsType.numberLike('amount', 'quantity', processors.toBigNumber),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.SPONSORSHIP]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.money('minSponsoredAssetFee', 'assetId', processors.moneyToAssetId),
        //@ts-ignore
        fieldsType.numberLike('minSponsoredAssetFee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.TRANSFER]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.money('amount', 'assetId', processors.moneyToAssetId),
        //@ts-ignore
        fieldsType.required('amount', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.money('fee', 'feeAssetId', processors.moneyToAssetId),
        //@ts-ignore
        fieldsType.required('fee', 'fee', processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
        fieldsType.aliasOrAddress('recipient'),
        //@ts-ignore
        fieldsType.attachment('attachment', null, processors.orString, true),
    ],
    [SIGN_TYPE.LEASE]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        fieldsType.aliasOrAddress('recipient'),
        //@ts-ignore
        fieldsType.numberLike('amount', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.CANCEL_LEASING]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        fieldsType.string('leaseId', 'transactionId'),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.CREATE_ALIAS]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.aliasName('alias'),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
    [SIGN_TYPE.MASS_TRANSFER]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.money('totalAmount', 'assetId', processors.moneyToAssetId),
        //@ts-ignore
        fieldsType.transfers('transfers', null, processors.transfers(
            processors.noProcess,
            processors.toBigNumber
        )),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.attachment('attachment', null, processors.orString, true),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
    ],
