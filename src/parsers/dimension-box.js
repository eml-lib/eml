export const parse = (values, valueParseFn) => {
	if (!Array.isArray(values)) {
		values = [values];
	}

	if (values.length) {
		const [top = 0, right = top, bottom = top, left = right] = values;

		return {
			top: valueParseFn(top),
			right: valueParseFn(right),
			bottom: valueParseFn(bottom),
			left: valueParseFn(left)
		};
	}

	throw new Error(`Invalid format "${values}"`);
};

export const stringify = (dimensions, valueStringifyFn) => {
	if (dimensions) {
		const { top, right, bottom, left } = dimensions;
		return [top, right, bottom, left].map(valueStringifyFn).join(' ');
	} else {
		return null;
	}
};

export const validate = (values, valueParseFn) => parse(values, valueParseFn);