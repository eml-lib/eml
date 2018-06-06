import deleteProperties from '../helpers/object-delete-properties';
import { parse as parseDimensionBox, parseValues as parseDimensionBoxValues } from "../parsers/dimensionBox";

export const convert = props => {
	const {
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		...restProps
	} = props;

	const newProps = {
		...restProps,
		margin: margin
			? parseDimensionBox(margin)
			: parseDimensionBoxValues(marginTop, marginRight, marginBottom, marginLeft)
	};

	return deleteProperties(newProps, [
		'marginTop',
		'marginRight',
		'marginBottom',
		'marginLeft'
	]);
};