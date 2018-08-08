const createPropType = isRequired => (props, propName, componentName) => {
	const value = props[propName];

	if ((value === null || value === undefined) && isRequired) {
		return new TypeError(`\`${componentName}\`: prop \`${propName}\` is required.`);
	}
};

const propType = createPropType(false);
propType.isRequired = createPropType(true);

export default propType;