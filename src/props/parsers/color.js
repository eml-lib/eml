import colorConverter from 'css-color-converter';

export const convert = value => colorConverter(value).toHexString();

export const validate = value => 'values' in colorConverter(value);