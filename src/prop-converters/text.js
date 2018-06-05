import deleteProperties from '../helpers/object-delete-properties';
import { parse as parseColor } from '../parsers/color';
import { parse as parseString } from '../parsers/string';
import { parse as parseOneOf } from '../parsers/oneOf';
import { parse as parseDimension } from '../parsers/dimension';

export const convert = props => {
    const {
        color,
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,
		letterSpacing,
		textTransform,

		...otherProps
    } = props;

    const newProps = {
		...otherProps,
		color: color ? parseColor(color) : null,
		font: {
			size: fontSize ? parseDimension(fontSize) : null,
			family: fontFamily ? parseString(fontFamily) : null,
			weight: fontWeight ? parseOneOf(fontWeight, ['normal', 'bold']) : null,
			lineHeight: lineHeight ? parseDimension(lineHeight) : null,
		},
		letterSpacing: letterSpacing ? parseDimension(letterSpacing) : null,
		textTransform: textTransform ? parseOneOf(textTransform, ['capitalize', 'uppercase', 'lowercase']) : null
	};

    return deleteProperties(newProps, [
    	'fontSize',
		'fontFamily',
		'fontWeight',
		'lineHeight'
	]);
};