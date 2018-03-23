export function parse(value) {
	if (typeof value === 'object') {
		return value;
	}

	if (typeof Number(value) !== 'number') {
		throw new Error('Parameter "' + value + '" not a number');
	}

	return Number(value);
}