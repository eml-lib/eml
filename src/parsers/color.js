import colorConverter from 'css-color-converter';

export const convert = value => colorConverter(value).toHexString();

// export const parse = value => colorConverter(value);

// export const stringify = color => color ? color.toHexString() : null;

export const validate = value => 'values' in colorConverter(value);