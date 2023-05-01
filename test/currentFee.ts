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
