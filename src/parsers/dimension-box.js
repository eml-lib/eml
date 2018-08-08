export function parse(values) {
	const isObjectFormat = (
		typeof values === 'object'
		&& ['top', 'right', 'bottom', 'left'].some(dimension => dimension in values)
	);
	const isArrayFormat = Array.isArray(values);
	const isStringFormat = typeof values === 'string';
	const isNumberFormat = typeof values === 'number';

	if (isObjectFormat) {
		return values;
	}

	if (isArrayFormat || isStringFormat || isNumberFormat) {
		if (isNumberFormat) {
			values = [values];
		}

		if (isStringFormat) {
			values = values !== '' ? values.split(' ').map(Number) : null;
		}

		if (!values.length) {
			throw new Error(`Invalid format "${values}"`);
		}

		const [
			top = 0,
			right = top,
			bottom = top,
			left = right
		] = values;

		return { top, right, bottom, left };
	}

	throw new Error(`Invalid format "${values}"`);
}

export function stringify(dimensions) {
	if (dimensions) {
		const { top, right, bottom, left } = dimensions;
		return [top, right, bottom, left].map(value => value !== 0 ? value + 'px' : value).join(' ');
	} else {
		return null;
	}
}