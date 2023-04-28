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

const ADDRESS = {
    MAX_ADDRESS_LENGTH: 45
};

const ASSETS = {
    NAME_MIN_BYTES: 4,
    NAME_MAX_BYTES: 16,
    DESCRIPTION_MAX_BYTES: 1000,
};

export const ERROR_MSG = {
    REQUIRED: 'field is required',
    WRONG_TYPE: 'field is wrong type',
    WRONG_NUMBER: 'field is not number',
    WRONG_TIMESTAMP: 'field is not timestamp',
    SMALL_FIELD: 'field is small',
    LARGE_FIELD: 'field is large',
    WRONG_SYMBOLS: 'field has wrong symbols',
    WRONG_ADDRESS: 'field is wrong address',
    WRONG_BOOLEAN: 'field is wrong boolean',
    WRONG_ASSET_ID: 'field is wrong assetId',
    WRONG_ORDER_TYPE: 'field is wrong order type. Field can be "buy" or "sell"',
    NOT_HTTPS_URL: 'field can be url with https protocol',
    BASE64: 'field can be base64 string with prefix "base64:"',
    EMPTY_BASE64: 'field can be not empty base64"',
};

const isBase64 = (value: string): boolean => {
    const regExp = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    return regExp.test(value);
};

//@ts-ignore
const getBytesFromString = value => {
    return utils.convert.stringToByteArray(value);
};

//@ts-ignore
const numberToString = (num) => num && typeof num === 'number' ? num.toString() : num;

const error = ({ value, ...options }: IFieldOptions, message: string) => {
    const { name: field, type } = options;
    throw { value, field, type, message };
};

const required = (options: IFieldOptions) => {
    const { value, optional } = options;
    
    if (!optional && value == null) {
        error(options, ERROR_MSG.REQUIRED);
    }
};

const string = (options: IFieldOptions) => {
    options = { ...options, value: numberToString(options.value) };
    required(options);
    const { value, optional } = options;
    
    if ((!optional && value == null) && (value != null && typeof value !== 'string')) {
        return error(options, ERROR_MSG.WRONG_TYPE);
    }
};

const attachment = (options: IFieldOptions) => {
    
    const { value } = options;
    
    if (value == null) {
        return;
    }
    
    if (typeof value === 'string' || typeof value === 'number') {
        
        string(options);
        
        switch (true) {
            case typeof value != 'string':
                error(options, ERROR_MSG.WRONG_TYPE);
                break;
            case getBytesFromString(value).length > TRANSFERS.ATTACHMENT:
                error(options, ERROR_MSG.LARGE_FIELD);
                break;
        }
        
        return;
    }
    
    if (typeof value === 'object') {
        
        switch (true) {
            case typeof value.length !== 'number' || value.length < 0:
                error(options, ERROR_MSG.WRONG_TYPE);
                break;
            case value.length > TRANSFERS.ATTACHMENT:
                error(options, ERROR_MSG.LARGE_FIELD);
                break;
        }
        
        return;
    }
    
    error(options, ERROR_MSG.WRONG_TYPE);
};

const number = (options: IFieldOptions) => {
    required(options);
    const { value } = options;
    
    if (value != null && new BigNumber(value).isNaN()) {
        return error(options, ERROR_MSG.WRONG_NUMBER);
    }
};

const boolean = (options: IFieldOptions) => {
    required(options);
    const { value } = options;
    
    if (value != null && typeof value !== 'boolean') {
        return error(options, ERROR_MSG.WRONG_BOOLEAN);
    }
};
