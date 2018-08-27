import createPropType from './helpers/create-prop-type';

export default propType => createPropType((props, propName, componentName) => {
	const value = props[propName];

	const isMediaQuery = wrapper.value && wrapper.media;

	if (isMediaQuery) {

	}

	// if (!urlRegexp({ exact: true }).test(value)) {
	// 	return new TypeError(
	// 		`Invalid value \`${value}\` of prop \`${propName}\` supplied to \`${componentName}\`, expected correct URL`
	// 	);
	// }
});