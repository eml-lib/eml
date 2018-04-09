import parsers from '../parsers';
import Element from './element';
const { createElement, Fragment } = require('../eml-core/build.js');

const blockElement = Component => props => {
	props = Element(props);

	const {
		width,
		height,

		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,

		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,

		border,
		// borderTop,
		// borderRight,
		// borderBottom,
		// borderLeft,

		borderRadius,

		background,
		backgroundColor,
		backgroundImage,
		// backgroundPosition,
		// backgroundRepeat,

		children,

		...otherProps
	} = props;

	const paddingProp = padding
		? parsers.dimensionBox.parse(padding)
		: parsers.dimensionBox.parseValues(paddingTop, paddingRight, paddingBottom, paddingLeft);

	const marginProp = margin
		? parsers.dimensionBox.parse(margin)
		: parsers.dimensionBox.parseValues(marginTop, marginRight, marginBottom, marginLeft);

	const backgroundProp = (background || backgroundColor || backgroundImage)
		? {
			color: backgroundColor ? parsers.color.parse(backgroundColor) : null,
			image: backgroundImage,
		}
		: null;

	const newProps = {
		...otherProps,
		width: width ? parsers.dimension.parse(width) : null,
		height: height ? parsers.dimension.parse(height) : null,
		padding: paddingProp,
		margin: marginProp
	};

	Component.componentType = 'block-element';

	return (
		<Component {...newProps}>
			{ children }
		</Component>
	);
};

export default blockElement;