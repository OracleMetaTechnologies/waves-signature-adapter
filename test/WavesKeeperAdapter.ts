import { WavesKeeperAdapter } from '../src/adapters/WavesKeeperAdapter';
import { Asset, Money, BigNumber } from '@waves/data-entities';
import { TRANSACTION_TYPE_NUMBER } from '../src/prepareTx';

const testAsset = new Asset({
    precision: 5,
    id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
    quantity: new BigNumber(10000),
    description: 'Some text',
    height: 100,
    name: 'Test',
    reissuable: false,
    sender: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
    timestamp: new Date(),
    ticker: undefined
});

const keeperMock = {
    //@ts-ignore
    auth: async (data) => ({
        'data': 'test',
        'prefix': 'WavesWalletAuthentication',
        'host': 'www.yandex.ru',
        'name': 'test',
        'address': '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
        'publicKey': '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        'signature': '3xvbSznhRTgDP5vMSoPpqwVf29hSdDQLFpdbtVaMHCyzuFFEgSodB7MXZTescxcYiVtR9wCgTGmZPWTApMVMg6qP'
    }),
    //@ts-ignore
    signTransaction: async data => {
        switch (data.type) {
            case TRANSACTION_TYPE_NUMBER.SPONSORSHIP:
            case TRANSACTION_TYPE_NUMBER.BURN:
            case TRANSACTION_TYPE_NUMBER.CANCEL_LEASING:
            case TRANSACTION_TYPE_NUMBER.CREATE_ALIAS:
            case TRANSACTION_TYPE_NUMBER.DATA:
            case TRANSACTION_TYPE_NUMBER.EXCHANGE:
            case TRANSACTION_TYPE_NUMBER.ISSUE:
            case TRANSACTION_TYPE_NUMBER.LEASE:
            case TRANSACTION_TYPE_NUMBER.MASS_TRANSFER:
            case TRANSACTION_TYPE_NUMBER.TRANSFER:
            case TRANSACTION_TYPE_NUMBER.REISSUE:
            case TRANSACTION_TYPE_NUMBER.SET_SCRIPT:
                break;
            default:
                throw new Error('invalid transaction');
        }
        return JSON.stringify({ proofs: ['test', 'realProof'] });
    },
