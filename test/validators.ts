import { SeedAdapter } from '../src/adapters';
import { Asset, Money, BigNumber } from '@waves/data-entities';
import { SIGN_TYPE } from '../src/prepareTx';
import { ERROR_MSG } from '../src/prepareTx/fieldValidator';
import { Seed } from '@waves/signature-generator';

const getError = (e: Error) => JSON.parse(e.message);
const testSeed = 'some test seed words without money on mainnet';
const seed = new Seed(testSeed);
const testAsset = new Asset({
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
