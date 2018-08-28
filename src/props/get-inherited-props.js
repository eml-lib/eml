export default props => {
	const {
		color,
		// direction, // ltr | rtl
		// fontFamily,
		fontSize,
		fontStyle,
		fontWeight,
		font,
		letterSpacing,
		lineHeight,
		textAlign,
		// textIndent,
		textTransform
	} = props;

	return {
		color,
		fontSize,
		fontStyle,
		fontWeight,
		font,
		letterSpacing,
		lineHeight,
		textAlign,
		textTransform
	};
}