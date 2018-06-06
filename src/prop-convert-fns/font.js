import { parse as parseString } from '../types/string';
import { parse as parseOneOf } from '../types/oneOf';
import { parse as parseDimension } from '../types/dimension';

export default props => {
	const {
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,
		...restProps
	} = props;

	return {
		font: {
			size: fontSize ? parseDimension(fontSize) : null,
			family: fontFamily ? parseString(fontFamily) : null,
			weight: fontWeight ? parseOneOf(fontWeight, ['normal', 'bold']) : null,
			lineHeight: lineHeight ? parseDimension(lineHeight) : null,
		},
		...restProps
	};
};