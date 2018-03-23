export function parse(value) {
	if (typeof value === 'object') {
		return value;
	}

	if (typeof value !== 'string') {
		// throw new Error('Invalid parameter "' + value + '"');
		return null;
	}

	return value;
}