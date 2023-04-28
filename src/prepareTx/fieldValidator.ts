import { Money, BigNumber } from '@waves/data-entities';
import { utils, libs } from '@waves/signature-generator';

const TRANSFERS = {
    ATTACHMENT: 140
};

const ALIAS = {
    AVAILABLE_CHARS: '-.0123456789@_abcdefghijklmnopqrstuvwxyz',
    MAX_ALIAS_LENGTH: 30,
    MIN_ALIAS_LENGTH: 4,
};
