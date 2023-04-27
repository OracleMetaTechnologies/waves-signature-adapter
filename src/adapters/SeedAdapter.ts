import { Adapter, IUser } from './Adapter';
import { AdapterType } from '../config';
import { Seed, utils } from '@waves/signature-generator';
import { SIGN_TYPE } from '../prepareTx';


export class SeedAdapter extends Adapter {

    private seed: Seed;
    public static type = AdapterType.Seed;


    constructor(data: string | IUser) {
        super();
        let seed;

        if (typeof data === 'string') {
            seed = data;
        } else {
            const user = <IUser>data;
            const encryptionRounds = user.encryptionRounds;
            seed = Seed.decryptSeedPhrase(user.encryptedSeed, user.password, encryptionRounds);
        }

        this.seed = new Seed(seed);
    }
