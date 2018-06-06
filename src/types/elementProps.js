import { parse as parseColor } from "./color";
import { parse as parseDimension } from "./dimension";
import { parse as parseDimensionBox, parseValues as parseDimensionBoxValues } from "./dimensionBox";
import textProps from '../prop-converters/textProps';

const elementProps = props => {
	props = textProps(props);

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

		...otherProps
	} = props;

	const widthProp = width ? parseDimension(width) : null;
	const heightProp = height ? parseDimension(height) : null;

	const paddingProp = padding
		? parseDimensionBox(padding)
		: parseDimensionBoxValues(paddingTop, paddingRight, paddingBottom, paddingLeft);

	const marginProp = margin
		? parseDimensionBox(margin)
		: parseDimensionBoxValues(marginTop, marginRight, marginBottom, marginLeft);

	const borderProp = border
		? border
		: null;

	const backgroundProp = (background || backgroundColor || backgroundImage)
		? {
			color: backgroundColor ? parseColor(backgroundColor) : null,
			image: backgroundImage,
		}
		: null;

	const borderRadiusProp = borderRadius ? parseDimension(borderRadius) : null;

	return {
		...otherProps,
		width: widthProp,
		height: heightProp,
		padding: paddingProp,
		margin: marginProp,
		border: borderProp,
		background: backgroundProp,
		borderRadius: borderRadiusProp
	};
};

export default elementProps;