import { Seed, utils } from '@waves/signature-generator';
import { Asset, BigNumber, Money } from '@waves/data-entities';
import { SeedAdapter, SIGN_TYPE } from '../src/index';
import './WavesKeeperAdapter';
import './validators';


const testSeed = 'some test seed words without money on mainnet';
const seed = new Seed(testSeed);

//@ts-ignore
const checkCryptoGen = publicKey => (bytes, signature) => {
    return utils.crypto.isValidSignature(bytes, signature, publicKey);
};

const checkCrypto = checkCryptoGen(seed.keyPair.publicKey);

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
