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
[SIGN_TYPE.DATA]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
        fieldsType.data('data')
    ],
    [SIGN_TYPE.SET_SCRIPT]: [
        fieldsType.string('senderPublicKey', null, null, true),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        fieldsType.script('script')
    ],
    [SIGN_TYPE.SET_ASSET_SCRIPT]: [
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.asset('assetId'),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toBigNumber),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
        fieldsType.asset_script('script')
    ],
    [SIGN_TYPE.SCRIPT_INVOCATION]: [
        fieldsType.number('type', null, processors.addValue(() => SIGN_TYPE.SCRIPT_INVOCATION), true),
        fieldsType.number('version', null, processors.addValue(() => 1), true),
    
        fieldsType.string('senderPublicKey', null, null, true),
        fieldsType.address('dappAddress'),
        //@ts-ignore
        fieldsType.call('call', 'call', processors.callFunc, false),
        //@ts-ignore
        fieldsType.payment('payment', null, processors.payments, true),
        //@ts-ignore
        fieldsType.numberLike('fee', null, processors.toNumberString),
        //@ts-ignore
        fieldsType.numberLike('fee', 'assetId', processors.moneyToAssetId),
        //@ts-ignore
        fieldsType.timestamp('timestamp', null, processors.timestamp),
        fieldsType.number('chainId', null, processors.addValue(() => config.getNetworkByte()), true),
    ]
};

module schemas {

    export module api {

        export const coinomatConfirmation = schema(
            wrap('prefix', 'prefix', processors.addValue('Coinomat')),
            'timestamp'
        );

        export const createOrder = schema(
            'matcherPublicKey',
            'orderType',
            wrap(null, 'assetPair', processors.assetPair),
            wrap(null, 'price', processors.toOrderPrice),
            wrap('amount', 'amount', processors.toBigNumber),
            wrap('matcherFee', 'matcherFee', processors.toBigNumber),
            wrap('expiration', 'expiration', processors.expiration),
            'senderPublicKey',
            'timestamp',
            wrap('proofs', 'signature', processors.signatureFromProof)
        );

        export const createOrder_v2 = schema(
            'matcherPublicKey',
            'orderType',
            wrap(null, 'version', processors.addValue(2)),
            wrap(null, 'assetPair', processors.assetPair),
            wrap(null, 'price', processors.toOrderPrice),
            wrap('amount', 'amount', processors.toBigNumber),
            wrap('matcherFee', 'matcherFee', processors.toBigNumber),
            wrap('expiration', 'expiration', processors.expiration),
            'senderPublicKey',
            'timestamp',
            'proofs'
        );

        export const cancelOrder = schema(
            wrap('id', 'orderId', processors.noProcess),
            wrap('senderPublicKey', 'sender', processors.noProcess),
            wrap('proofs', 'signature', processors.signatureFromProof)
        );

        export const issue = schema(
            wrap('version', 'version', processors.addValue(TRANSACTION_TYPE_VERSION.ISSUE)),
            wrap('chainId', 'chainId', processors.addValue(() => config.getNetworkByte())),
            'senderPublicKey',
            'name',
            'description',
            wrap('quantity', 'quantity', processors.toBigNumber),
            wrap('precision', 'decimals', processors.noProcess),
            wrap('reissuable', 'reissuable', processors.noProcess),
            wrap('fee', 'fee', processors.toBigNumber),
            wrap('timestamp', 'timestamp', processors.timestamp),
            wrap('type', 'type', processors.addValue(SIGN_TYPE.ISSUE)),
            wrap('script', 'script', processors.scriptProcessor),
            'proofs'
        );
