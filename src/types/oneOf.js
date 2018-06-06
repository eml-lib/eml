export function parse(value, values) {
	if (typeof value === 'object') {
		return value;
	}

	const matchedValue = values.includes(value) ? value : null;

	if (!matchedValue) {
		const expectedList = values.map(value => `"${value}"`).join(' | ');
		throw new Error(`Parameter "${value}" not in list. Only ${expectedList}`);
	}

	return matchedValue;
}