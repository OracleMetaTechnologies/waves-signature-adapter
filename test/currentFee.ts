import { BigNumber, Asset, Money } from '@waves/data-entities';
import { Seed } from '@waves/signature-generator';
import { Signable, currentFeeFactory, currentCreateOrderFactory, SeedAdapter, TSignData, SIGN_TYPE } from '../src';
import { IExchangeTransactionOrder } from '@waves/ts-types';

const seed = Seed.create();

const CONFIG = {
    'smart_asset_extra_fee': new BigNumber(400000),
    'smart_account_extra_fee': new BigNumber(400000),
    'calculate_fee_rules': {
        'default': {
            'add_smart_asset_fee': true,
            'add_smart_account_fee': true,
            'min_price_step': new BigNumber(100000),
            'fee': new BigNumber(100000)
        },
        '3': {
            'fee': new BigNumber(100000000)
        },
        '5': {
            'fee': new BigNumber(100000000)
        },
        '7': {
            'add_smart_account_fee': false,
            'fee': new BigNumber(300000)
        },
        '11': {
            'price_per_transfer': new BigNumber(50000)
        },
        '12': {
            'price_per_kb': new BigNumber(100000)
        },
        '13': {
            'fee': new BigNumber(1000000)
        },
        '14': {
            'fee': new BigNumber(100000000)
        },
        '15': {
            'fee': new BigNumber(100000000)
        }
    }
};

const WAVES_ASSET = new Asset({
    precision: 8,
    id: 'WAVES',
    quantity: new BigNumber('1000000000000000'),
    description: 'Waves token',
    height: 0,
    name: 'Waves',
    reissuable: false,
    sender: seed.address,
    timestamp: new Date(),
    ticker: 'WAVES'
});

const TEST_ASSET = new Asset({
    precision: 5,
    id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
    quantity: new BigNumber(10000),
    description: 'Some text',
    height: 100,
    name: 'Test',
    reissuable: false,
    sender: seed.address,
    timestamp: new Date(),
    ticker: undefined
});

const TEST_LIST: Array<ITestItem> = [
    {
        data: {
            type: SIGN_TYPE.TRANSFER,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                recipient: seed.address,
                amount: new Money(1, TEST_ASSET)
            }
        },
        hasScript: true,
        smartAssetIdList: undefined,
        fee: new BigNumber(500000)
    },
    {
        data: {
            type: SIGN_TYPE.TRANSFER,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                recipient: seed.address,
                amount: new Money(1, TEST_ASSET)
            }
        },
        hasScript: false,
        smartAssetIdList: [],
        fee: new BigNumber(100000)
    },
    {
        data: {
            type: SIGN_TYPE.TRANSFER,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                recipient: seed.address,
                amount: new Money(1, TEST_ASSET)
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(900000)
    },
    {
        data: {
            type: SIGN_TYPE.ISSUE,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules['3'].fee, WAVES_ASSET),
                name: 'My Asset',
                description: 'My asset description',
                quantity: new BigNumber(500),
                precision: 1,
                reissuable: true
            }
        },
        hasScript: false,
        smartAssetIdList: undefined,
        fee: new BigNumber(100000000)
    },
    {
        data: {
            type: SIGN_TYPE.ISSUE,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules['3'].fee, WAVES_ASSET),
                name: 'My Asset',
                description: 'My asset description',
                quantity: new BigNumber(500),
                precision: 1,
                reissuable: true
            }
        },
        hasScript: true,
        smartAssetIdList: undefined,
        fee: new BigNumber(100400000)
    },
    {
        data: {
            type: SIGN_TYPE.REISSUE,
            data: {
                timestamp: Date.now(),
                assetId: TEST_ASSET.id,
                fee: new Money(CONFIG.calculate_fee_rules['5'].fee, WAVES_ASSET),
                quantity: new BigNumber(500),
                reissuable: true
            }
        },
        hasScript: true,
        smartAssetIdList: undefined,
        fee: new BigNumber(100400000)
    },
    {
        data: {
            type: SIGN_TYPE.REISSUE,
            data: {
                timestamp: Date.now(),
                assetId: TEST_ASSET.id,
                fee: new Money(CONFIG.calculate_fee_rules['5'].fee, WAVES_ASSET),
                quantity: new BigNumber(500),
                reissuable: true
            }
        },
        hasScript: false,
        smartAssetIdList: undefined,
        fee: new BigNumber(100000000)
    },
    {
        data: {
            type: SIGN_TYPE.REISSUE,
            data: {
                timestamp: Date.now(),
                assetId: TEST_ASSET.id,
                fee: new Money(CONFIG.calculate_fee_rules['5'].fee, WAVES_ASSET),
                quantity: new BigNumber(500),
                reissuable: true
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(100800000)
    },
    {
        data: {
            type: SIGN_TYPE.BURN,
            data: {
                timestamp: Date.now(),
                assetId: TEST_ASSET.id,
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                amount: new BigNumber(500),
            }
        },
        hasScript: false,
        smartAssetIdList: undefined,
        fee: new BigNumber(100000)
    },
    {
        data: {
            type: SIGN_TYPE.BURN,
            data: {
                timestamp: Date.now(),
                assetId: TEST_ASSET.id,
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                amount: new BigNumber(500),
            }
        },
        hasScript: true,
        smartAssetIdList: undefined,
        fee: new BigNumber(500000)
    },
    {
        data: {
            type: SIGN_TYPE.BURN,
            data: {
                timestamp: Date.now(),
                assetId: TEST_ASSET.id,
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                amount: new BigNumber(500),
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(900000)
    },
    {
        data: {
            type: SIGN_TYPE.LEASE,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                amount: new BigNumber(500),
                recipient: seed.address
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(100000)
    },
    {
        data: {
            type: SIGN_TYPE.LEASE,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                amount: new BigNumber(500),
                recipient: seed.address
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(500000)
    },
    {
        data: {
            type: SIGN_TYPE.CANCEL_LEASING,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                leaseId: TEST_ASSET.id
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(100000)
    },
    {
        data: {
            type: SIGN_TYPE.CANCEL_LEASING,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                leaseId: TEST_ASSET.id
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(500000)
    },
    {
        data: {
            type: SIGN_TYPE.CREATE_ALIAS,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                alias: 'some'
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(100000)
    },
    {
        data: {
            type: SIGN_TYPE.CREATE_ALIAS,
            data: {
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                alias: 'some'
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(500000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: false,
        smartAssetIdList: [],
        fee: new BigNumber(200000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(600000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(1000000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: false,
        smartAssetIdList: [],
        fee: new BigNumber(200000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(600000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(1000000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: false,
        smartAssetIdList: [],
        fee: new BigNumber(300000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(700000)
    },
    {
        data: {
            type: SIGN_TYPE.MASS_TRANSFER,
            data: {
                assetId: TEST_ASSET.id,
                totalAmount: new Money(1, TEST_ASSET),
                timestamp: Date.now(),
                fee: new Money(CONFIG.calculate_fee_rules.default.fee, WAVES_ASSET),
                transfers: [{
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }, {
                    amount: 1,
                    recipient: seed.address
                }]
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(1100000)
    },
    {
        data: {
            type: SIGN_TYPE.DATA,
            data: {
                fee: new Money(1, WAVES_ASSET),
                timestamp: Date.now(),
                data: [
                    { key: 'test', type: 'string', value: '123' }
                ]
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(100000)
    },
    {
        data: {
            type: SIGN_TYPE.DATA,
            data: {
                fee: new Money(1, WAVES_ASSET),
                timestamp: Date.now(),
                data: [
                    { key: 'test', type: 'string', value: '123' }
                ]
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(500000)
    },
    {
        data: {
            type: SIGN_TYPE.SET_SCRIPT,
            data: {
                fee: new Money(1, WAVES_ASSET),
                timestamp: Date.now(),
                script: ''
            }
        },
        hasScript: false,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(1000000)
    },
    {
        data: {
            type: SIGN_TYPE.SET_SCRIPT,
            data: {
                fee: new Money(1, WAVES_ASSET),
                timestamp: Date.now(),
                script: ''
            }
        },
        hasScript: true,
        smartAssetIdList: [TEST_ASSET.id],
        fee: new BigNumber(1400000)
    },
