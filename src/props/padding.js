import * as dimensionBoxParser from './parsers/dimension-box';

export const parse = props => {
	const {
		padding,
		paddingTop = 0,
		paddingRight = 0,
		paddingBottom = 0,
		paddingLeft = 0
	} = props;

	const value = padding || [paddingTop, paddingRight, paddingBottom, paddingLeft];
	return dimensionBoxParser.parse(value, Number);
};

export const stringify = padding => dimensionBoxParser.stringify(padding, value => value + 'px');