import deleteProperties from '../helpers/object-delete-properties';
import { parse as parseString } from '../parsers/string';
import { parse as parseOneOf } from '../parsers/oneOf';
import { parse as parseDimension } from '../parsers/dimension';

export default props => {
	const {
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,
		...otherProps
	} = props;

	const newProps = {
		...otherProps,
		font: {
			size: fontSize ? parseDimension(fontSize) : null,
			family: fontFamily ? parseString(fontFamily) : null,
			weight: fontWeight ? parseOneOf(fontWeight, ['normal', 'bold']) : null,
			lineHeight: lineHeight ? parseDimension(lineHeight) : null,
		}
	};

	return deleteProperties(newProps, [
		'fontSize',
		'fontFamily',
		'fontWeight',
		'lineHeight'
	]);
};