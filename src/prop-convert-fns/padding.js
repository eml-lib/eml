import { parse as parseDimensionBox, parseValues as parseDimensionBoxValues } from "../types/dimensionBox";

export default props => {
	const {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		...restProps
	} = props;

	return {
		padding: padding
			? parseDimensionBox(padding)
			: parseDimensionBoxValues(paddingTop, paddingRight, paddingBottom, paddingLeft),
		...restProps
	};
};