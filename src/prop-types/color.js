import { validate } from '../converters/color';

const createUrlPropType = isRequired => (props, propName, componentName) => {
	const value = props[propName];

	if (value == null && isRequired) {
		return new TypeError(`\`${componentName}\`: prop \`${propName}\` is required.`);
	}

	if (!validate) {
		return new TypeError(`Invalid value \`${value}\` of prop \`${propName}\` supplied to \`${componentName}\`, expected correct color`)
	}
};

const urlPropType = createUrlPropType(false);
urlPropType.isRequired = createUrlPropType(true);

export default urlPropType;