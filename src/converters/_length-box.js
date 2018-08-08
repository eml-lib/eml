import { parse as lengthParser } from './length';

export function parse(value, unitTypes) {
	const isObjectFormat = (
		typeof value === 'object'
		&& ['top', 'right', 'bottom', 'left'].some(length => length in value)
	);

	const isArrayFormat = Array.isArray(value);
	const isStringFormat = typeof value === 'string';
	const isNumberFormat = typeof value === 'number';

	if (isObjectFormat) {
		return value;
	}

	if (isArrayFormat || isStringFormat || isNumberFormat) {
		if (isNumberFormat) {
			value = [lengthParser(value, unitTypes)];
		}

		if (isStringFormat) {
			value = value !== '' ? value.split(' ').map(length => lengthParser(length, unitTypes)) : null;
		}

		if (!value.length) {
			throw new Error(`Invalid format "${value}"`);
		}

		const [
			top = lengthParser(0, unitTypes),
			right = top,
			bottom = top,
			left = right
		] = value;

		return { top, right, bottom, left };
	}

	throw new Error(`Invalid format "${value}"`);
}

export function stringify(dimensions) {
	if (dimensions) {
		const { top, right, bottom, left } = dimensions;
		return [top, right, bottom, left].map(value => value + 'px').join(' ');
	} else {
		return null;
	}
}