import { convert as convertColor } from '../parsers/color';

export default props => {
	const {
		font,
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,

		letterSpacing,
		textDecoration,
		textTransform,

		color
	} = props;

	return {
		font,
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,

		letterSpacing,
		textDecoration: textDecoration ? 'underline' : 'none',
		textTransform,

		color: color ? convertColor(color) : null
	};
};