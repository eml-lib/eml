export default parseFn => value => {
	const isMediaQuery = Array.isArray(value) && value.length === 2 && Object.keys(value[1]).every(key => reCssMediaQuery().test(key));

	if (isMediaQuery) {
		return {
			value: parseFn(value[0]),
			mediaQueries: Object.entries(value[1]).reduce((acc, [query, value]) => ({
				...acc,
				[query]: parseFn(value)
			}), {})
		};
	} else {
		return {
			value: parseFn(value[0])
		}
	}
};

export function stringifyCss(value, valueCssStringifier) {

}