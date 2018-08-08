import colorConverter from 'css-color-converter';

export const parse = value => {
	if (!validate(value)) {
		return new Error(`Invalid color value "${value}"`);
	}

	return colorConverter(value);
};

export const stringify = color => color ? color.toHexString() : null;

export const validate = value => 'values' in colorConverter(value);