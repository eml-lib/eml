/**
 * Function for creating custom propTypes
 *
 * @param {Function} handler
 * @returns {Function}
 */
export default handler => {
	const createPropType = isRequired => (props, propName, componentName) => {
		const value = props[propName];

		if (value === null || value === undefined) {
			if (isRequired) {
				return new TypeError(`\`${componentName}\`: prop \`${propName}\` is required.`);
			}

			return;
		}

		if (handler) {
			const error = handler(value);

			if (error instanceof TypeError) {
				return new TypeError(
					`Invalid value \`${value}\` of prop \`${propName}\` supplied to \`${componentName}\`: ${error.message}`
				);
			}
		}
	};

	const propType = createPropType(false);
	propType.isRequired = createPropType(true);

	return propType;
};