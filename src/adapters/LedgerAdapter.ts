import { Adapter } from './Adapter';
import { AdapterType } from '../config';
import { WavesLedger } from '@waves/ledger';
import { SIGN_TYPE } from '../prepareTx';


export class LedgerAdapter extends Adapter {

    //@ts-ignore
    private _currentUser;
    public static type = AdapterType.Ledger;
    //@ts-ignore
    private static _ledger;
    //@ts-ignore
    private static _hasConnectionPromise;


    //@ts-ignore
    constructor(user) {
        super();
        this._currentUser = user;

        if (!this._currentUser) {
            throw 'No selected user';
        }
    }

        public isAvailable() {
        return this._isMyLedger();
    }

    public getPublicKey() {
        return Promise.resolve(this._currentUser.publicKey);
    }

    public getAddress() {
        return Promise.resolve(this._currentUser.address);
    }

    public getSeed() {
        return Promise.reject(Error('Method "getSeed" is not available!'));
    }
    
    public getAdapterVersion() {
        return LedgerAdapter._ledger.getVersion();
    }
    
    public signRequest(bytes: Uint8Array): Promise<string> {
        return  this._isMyLedger()
            .then(() => LedgerAdapter._ledger.signRequest(this._currentUser.id, bytes));
    }

    public signTransaction(bytes: Uint8Array, amountPrecision: number): Promise<string> {
        if (bytes[0] === 15) {
            return this.signData(bytes);
        }
        return this._isMyLedger()
            .then(() => LedgerAdapter._ledger.signTransaction(this._currentUser.id, {precision: amountPrecision}, bytes));
    }

    public signOrder(bytes: Uint8Array, amountPrecision: number): Promise<string> {
        return this._isMyLedger()
            .then(() => LedgerAdapter._ledger.signOrder(this._currentUser.id, {precision: amountPrecision}, bytes));
    }

    public signData(bytes: Uint8Array): Promise<string> {
        return this._isMyLedger()
            .then(() => LedgerAdapter._ledger.signSomeData(this._currentUser.id, bytes));
    }

    public getPrivateKey() {
        return Promise.reject('No private key');
    }
