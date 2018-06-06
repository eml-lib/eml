import { parse as parseDimensionBox, parseValues as parseDimensionBoxValues } from "../types/dimensionBox";

export default props => {
	const {
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		...restProps
	} = props;

	return {
		margin: margin
			? parseDimensionBox(margin)
			: parseDimensionBoxValues(marginTop, marginRight, marginBottom, marginLeft),
		...restProps
	};
};