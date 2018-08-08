import urlRegexp from 'url-regex';

const createUrlPropType = isRequired => (props, propName, componentName) => {
	const value = props[propName];

	if (value == null && isRequired) {
		return new TypeError(`\`${componentName}\`: prop \`${propName}\` is required.`);
	}

	if (!urlRegexp({ exact: true }).test(value)) {
		return new TypeError(`Invalid value \`${value}\` of prop \`${propName}\` supplied to \`${componentName}\`, expected correct URL`)
	}
};

const urlPropType = createUrlPropType(false);
urlPropType.isRequired = createUrlPropType(true);

export default urlPropType;