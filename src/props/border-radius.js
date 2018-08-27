import * as dimensionBoxParser from './parsers/dimension-box';

export const parse = props => {
	const {
		borderRadius,
		borderTopLeftRadius = 0,
		borderTopRightRadius = 0,
		borderBottomLeftRadius = 0,
		borderBottomRightRadius = 0
	} = props;

	const value = borderRadius || [borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius];
	return dimensionBoxParser.parse(value, Number);
};

export const stringify = value => dimensionBoxParser.stringify(value, value => value + 'px');