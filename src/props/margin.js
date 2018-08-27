import * as dimensionBoxParser from './parsers/dimension-box';

export const parse = props => {
	const {
		margin,
		marginTop = 0,
		marginRight = 0,
		marginBottom = 0,
		marginLeft = 0
	} = props;

	const value = margin || [marginTop, marginRight, marginBottom, marginLeft];
	return dimensionBoxParser.parse(value, Number);
};

export const stringify = margin => dimensionBoxParser.stringify(margin, value => value + 'px');