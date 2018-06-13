const flatten = (array, depth = 1) => (
	depth === 0 ? array : array.reduce((acc, value) => (
		Array.isArray(value)
			? [...acc, ...(depth > 1 ? flatten(value, depth - 1) : value)]
			: [...acc, value]
	), [])
);

export default flatten;