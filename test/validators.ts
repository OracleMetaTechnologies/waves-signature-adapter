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

describe('Check validators', () => {
    
    let adapter: SeedAdapter;
    
    beforeEach(() => {
        adapter = new SeedAdapter(testSeed);
    });
    
    describe('check order validations', () => {
        
        const data = {
            matcherPublicKey: 'AHLRHBJYtxwqjCcBYnFWeDco8hGJicWYrFd5yM5bWmNh',
            orderType: 'sell',
            price: Money.fromTokens('12.22', testAsset),
            amount: new Money('12.5', testAsset),
            matcherFee: Money.fromTokens('0.003', testAsset),
            expiration: Date.now(),
        };
        
        it('valid order', () => {
            const signData = {
                type: SIGN_TYPE.CREATE_ORDER,
                data: { ...data }
            } as any;
            
            expect(
                (() => {
                    const signable = adapter.makeSignable(signData);
                    signable.getDataForApi();
                    return true;
                })()
            ).toBe(true)
        });
        
        it('invalid order type', () => {
            const signData = {
                type: SIGN_TYPE.CREATE_ORDER,
                data: { ...data, orderType: 'none' }
            } as any;
            
            try {
                adapter.makeSignable(signData);
                expect('Fail').toBe('Done');
            } catch (error) {
                const e = getError(error);
                expect(e.length).toEqual(1);
                expect(e[0].message).toEqual(ERROR_MSG.WRONG_ORDER_TYPE);
                expect(e[0].field).toEqual('orderType');
            }
        });
