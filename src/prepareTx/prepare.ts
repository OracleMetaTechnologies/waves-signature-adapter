import { Money, BigNumber, AssetPair, OrderPrice } from '@waves/data-entities';
import { WAVES_ID, libs, config } from '@waves/signature-generator';
import { VALIDATORS } from './fieldValidator';

//@ts-ignore
const normalizeAssetId = id => id === WAVES_ID ? '' : id;

interface ICall { function: string, args?: Array<any> }

export module prepare {
    
    export module processors {
        
        export function callFunc(callData?: ICall|null): ICall {
            callData = callData || Object.create(null);
            return {
                function: callData && callData.function || '',
                args: callData && callData.args || [],
            };
        }
        
        export function payments(payments: Array<Money>) {
            return (payments || []).map(pay => {
                return {
                    amount: toBigNumber(pay).toString(),
                    assetId: moneyToNodeAssetId(pay)
                }
            });
        }
        
        export function paymentsToNode(payments: Array<Money>) {
            return (payments || []).map(pay => {
                return {
                    amount: toBigNumber(pay),
                    assetId: moneyToNodeAssetId(pay) || null,
                }
            });
        }
        
        export function scriptProcessor(code: string): string | null {
            return !!(code || '').replace('base64:', '') ? code : null;
        }
        
        //@ts-ignore
        export function assetPair(data) {
            return {
                amountAsset: normalizeAssetId(data.amount.asset.id),
                priceAsset: normalizeAssetId(data.price.asset.id)
            };
        }
        
        //@ts-ignore
        export function signatureFromProof(proofs) {
            return proofs[0];
        }
        
        export function toBigNumber(some: string | number | BigNumber | Money): BigNumber {
            switch (typeof some) {
                case 'string':
                case 'number':
                    return new BigNumber(some as string);
                case 'object':
                    if (some instanceof BigNumber) {
                        return some;
                    } else {
                        return (some as Money).getCoins();
                    }
            }
        }
        
        export function toNumberString(some: any) {
            return toBigNumber(some).toString();
        }
        
        export function toSponsorshipFee(moeny: Money): BigNumber {
            const coins = moeny.getCoins();
            if (coins.eq(0)) {
                //@ts-ignore
                return null;
            } else {
                return coins;
            }
        }
        
        export function moneyToAssetId(money: Money): string {
            return money.asset.id;
        }
        
        export function moneyToNodeAssetId(money: Money): string {
            return idToNode(money.asset.id);
        }
        
               //@ts-ignore
        export function timestamp(time) {
            if (!(+time) && typeof time === 'string') {
                return Date.parse(time);
            }
            return time && time instanceof Date ? time.getTime() : time;
        }
        
        //@ts-ignore
        export function orString(data): string {
            return data || '';
        }
        
        //@ts-ignore
        export function noProcess(data) {
            return data;
        }
        
        //@ts-ignore
        export function recipient(data) {
            const code = String.fromCharCode(config.get('networkByte'));
            return data.length < 30 ? `alias:${code}:${data}` : data;
        }
        
        export function attachment(data: string) {
            data = data || '';
            const value = Uint8Array.from(libs.converters.stringToByteArray(data));
            return libs.base58.encode(Uint8Array.from(value));
        }
        
        export function addValue(value: any) {
            return typeof value === 'function' ? value : () => value;
        }
        
        //@ts-ignore
        export function expiration(date?) {
            return date || new Date().setDate(new Date().getDate() + 20);
        }
        
        //@ts-ignore
        export function transfers(recipient, amount) {
            //@ts-ignore
            return (transfers) => transfers.map((transfer) => ({
                recipient: recipient(transfer.recipient),
                amount: amount(transfer.amount)
            }));
        }
        
        //@ts-ignore
        export function quantity(data): BigNumber {
            return new BigNumber(data.quantity).times(new BigNumber(10).pow(data.precision));
        }
        
        //@ts-ignore
        export function base64(str): string {
            return (str || '').replace('base64:', '');
        }
        
        //@ts-ignore
        export function toOrderPrice(order) {
            const assetPair = new AssetPair(order.amount.asset, order.price.asset);
            const orderPrice = OrderPrice.fromTokens(order.price.toTokens(), assetPair);
            return orderPrice.getMatcherCoins();
        }
    }
    
