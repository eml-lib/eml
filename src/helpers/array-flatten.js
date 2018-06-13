const flatten = (array, depth = 1) => {
	if (depth === 0) {
		return array;
	}

	return array.reduce((acc, value) => (
		Array.isArray(value)
			? [
				...acc,
				...(depth > 1 ? flatten(value, depth - 1) : value)
			]
			: [...acc, value]
	), [])
};

export default flatten;