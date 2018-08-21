import * as dimensionBoxParser from '../parsers/dimension-box';

export default props => {
	const {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft
	} = props;

	return {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft
	};
};

export const parse = props => {
	const {
		padding,
		paddingTop = 0,
		paddingRight = 0,
		paddingBottom = 0,
		paddingLeft = 0
	} = props;

	const paddingValue = padding || [paddingTop, paddingRight, paddingBottom, paddingLeft];
	return dimensionBoxParser.parse(paddingValue, Number);
};

export const stringify = padding => dimensionBoxParser.stringify(padding, value => value + 'px');