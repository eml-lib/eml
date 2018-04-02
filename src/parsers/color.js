import colorConverter from 'css-color-converter';

export function parse(value) {
	if (typeof value === 'object') {
		return value;
	}

	const matchedValue = colorConverter(value);

	if (!('values' in matchedValue)) {
		throw new Error(`Invalid color parameter "${value}"`);
	}

	return matchedValue;
}

export function stringify(color) {
	return color ? color.toHexString() : null;
}