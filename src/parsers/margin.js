import * as dimensionBoxParser from "./dimension-box";

export default props => {
	const {
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft
	} = props;

	return {
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft
	};
};

export const parse = props => {
	const {
		margin,
		marginTop = 0,
		marginRight = 0,
		marginBottom = 0,
		marginLeft = 0
	} = props;

	const marginValue = margin || [marginTop, marginRight, marginBottom, marginLeft];
	return dimensionBoxParser.parse(marginValue, Number);
};

export const stringify = margin => dimensionBoxParser.stringify(margin, value => value + 'px');