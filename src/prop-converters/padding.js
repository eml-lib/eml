import deleteProperties from '../helpers/object-delete-properties';
import { parse as parseDimensionBox, parseValues as parseDimensionBoxValues } from "../parsers/dimensionBox";

export const convert = props => {
	const {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		...restProps
	} = props;

	const newProps = {
		...restProps,
		padding: padding
			? parseDimensionBox(padding)
			: parseDimensionBoxValues(paddingTop, paddingRight, paddingBottom, paddingLeft)
	};

	return deleteProperties(newProps, [
		'paddingTop',
		'paddingRight',
		'paddingBottom',
		'paddingLeft'
	]);
};