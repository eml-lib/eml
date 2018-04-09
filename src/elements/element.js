import parsers from '../parsers';
const { createElement, Fragment } = require('../eml-core/build.js');

const element = Component => props => {
	const {
		color,
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,
		letterSpacing,
		textTransform,

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

	const backgroundProp = (background || backgroundColor || backgroundImage)
		? {
			color: backgroundColor ? parsers.color.parse(backgroundColor) : null,
			image: backgroundImage,
		}
		: null;

	const newProps = {
		...otherProps,
		border: border ? border : null,
		background: backgroundProp,
		borderRadius: borderRadius ? parsers.dimension.parse(borderRadius) : null,
		color: color ? parsers.color.parse(color) : null,
		fontSize: fontSize ? parsers.dimension.parse(fontSize) : null,
		fontFamily: fontFamily ? parsers.string.parse(fontFamily) : null,
		fontWeight: fontWeight ? parsers.oneOf.parse(fontWeight, ['normal', 'bold']) : null,
		lineHeight: lineHeight ? parsers.dimension.parse(lineHeight) : null,
		letterSpacing: letterSpacing ? parsers.dimension.parse(letterSpacing) : null,
		textTransform: textTransform ? parsers.oneOf.parse(textTransform, ['capitalize', 'uppercase', 'lowercase']) : null
	};

	Component.componentType = 'element';

	return (
		<Component {...newProps}>
			{ children }
		</Component>
	);
};

export default element;