import { parse as parseColor } from '../types/color';
import { parse as parseOneOf } from '../types/oneOf';
import { parse as parseDimension } from '../types/dimension';

// CSS border styles
// none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset | initial | inherit
const styles = ['none', 'dotted', 'dashed', 'solid'];

export default props => {
	const {
		border,
		borderColor,
		borderWidth,
		borderBottomColor,
		borderBottomStyle,
		borderBottomWidth,
		borderLeftColor,
		borderLeftStyle,
		borderLeftWidth,
		borderRightColor,
		borderRightStyle,
		borderRightWidth,
		borderTopColor,
		borderTopStyle,
		borderTopWidth,
		...restProps
	} = props;

	return {
		border: {
			bottom: {
				color: borderBottomColor ? parseColor(borderBottomColor) : null,
				style: borderBottomStyle ? parseOneOf(borderBottomStyle, styles) : null,
				width: borderBottomWidth ? parseDimension(borderBottomWidth) : null,
			},
			left: {
				color: borderLeftColor ? parseColor(borderLeftColor) : null,
				style: borderLeftStyle ? parseOneOf(borderLeftStyle, styles) : null,
				width: borderLeftWidth ? parseDimension(borderLeftWidth) : null,
			},
			right: {
				color: borderRightColor ? parseColor(borderRightColor) : null,
				style: borderRightStyle ? parseOneOf(borderRightStyle, styles) : null,
				width: borderRightWidth ? parseDimension(borderRightWidth) : null,
			},
			top: {
				color: borderTopColor ? parseColor(borderTopColor) : null,
				style: borderTopStyle ? parseOneOf(borderTopStyle, styles) : null,
				width: borderTopWidth ? parseDimension(borderTopWidth) : null,
			}
		},
		...restProps
	};
};