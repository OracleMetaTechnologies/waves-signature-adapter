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
