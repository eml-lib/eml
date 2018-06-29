export default {};

export const parseMediaQueryAttr = value => {
	const isMediaQuery = Array.isArray(value) && value.some(item => typeof item === 'object');

	if (isMediaQuery) {
		return {
			value: value[0],
			mediaQueries: value.filter(item => typeof item === 'object')
		};
	} else {
		return {
			value,
			mediaQueries: []
		}
	}
};