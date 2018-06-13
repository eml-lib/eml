/**
 * Creates a new array with all sub-array elements concatted into it recursively up to the specified depth.
 * @param {Array} array
 * @param {number} depth Depth of flattening
 * @return {Array}
 */
export default function flatten(array, depth = 1) {
	return depth === 0
		? array
		: array.reduce((acc, value) => (
			Array.isArray(value)
				? [...acc, ...(depth > 1 ? flatten(value, depth - 1) : value)]
				: [...acc, value]
		), []);
}