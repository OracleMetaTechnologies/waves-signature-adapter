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
