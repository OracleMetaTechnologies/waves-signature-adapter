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
