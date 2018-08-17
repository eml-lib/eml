import { convert as convertColor } from './color';

// CSS border styles
// none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset | initial | inherit
const styles = ['none', 'dotted', 'dashed', 'solid'];

export default props => {
	const {
		border,
		borderColor,
		borderWidth,
		borderBottom,
		borderBottomColor,
		borderBottomStyle,
		borderBottomWidth,
		borderLeft,
		borderLeftColor,
		borderLeftStyle,
		borderLeftWidth,
		borderRight,
		borderRightColor,
		borderRightStyle,
		borderRightWidth,
		borderTop,
		borderTopColor,
		borderTopStyle,
		borderTopWidth,

		borderRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomLeftRadius,
		borderBottomRightRadius,
	} = props;

	return {
		border,
		borderColor,
		borderWidth,
		borderBottom,
		borderBottomColor,
		borderBottomStyle,
		borderBottomWidth,
		borderLeft,
		borderLeftColor,
		borderLeftStyle,
		borderLeftWidth,
		borderRight,
		borderRightColor,
		borderRightStyle,
		borderRightWidth,
		borderTop,
		borderTopColor,
		borderTopStyle,
		borderTopWidth,

		borderRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomLeftRadius,
		borderBottomRightRadius,
	};
};