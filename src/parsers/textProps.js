import { parse as parseColor } from './color';
import { parse as parseString } from './string';
import { parse as parseOneOf } from './oneOf';
import { parse as parseDimension } from './dimension';

const textProps = props => {
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

    return {
		...otherProps,
		color: color ? parseColor(color) : null,
		fontSize: fontSize ? parseDimension(fontSize) : null,
		fontFamily: fontFamily ? parseString(fontFamily) : null,
		fontWeight: fontWeight ? parseOneOf(fontWeight, ['normal', 'bold']) : null,
		lineHeight: lineHeight ? parseDimension(lineHeight) : null,
		letterSpacing: letterSpacing ? parseDimension(letterSpacing) : null,
		textTransform: textTransform ? parseOneOf(textTransform, ['capitalize', 'uppercase', 'lowercase']) : null
	};
};

export default textProps;