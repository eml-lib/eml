import propTypes from 'prop-types';
import length from './types/length';
import dimensionBox from './types/dimension-box';
import color from './types/color';

const { bool, number, string, oneOf } = propTypes;

const borderStyle = oneOf(['dotted', 'dashed', 'solid']);

export default {
	// Text
	color: color,
	// font: string,
	fontSize: length(['px']),
	fontFamily: string,
	fontWeight: oneOf(['normal', 'bold', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
	lineHeight: length(['px', '%']),
	letterSpacing: length(['px']),
	textDecoration: bool,
	textDecorationColor: color,
	textTransform: oneOf(['capitalize', 'uppercase', 'lowercase']),

	// Background
	// background: string,
	backgroundColor: color,
	backgroundImage: string,
	backgroundPosition: string,
	backgroundRepeat: oneOf(['repeat-x', 'repeat-y', 'repeat']),

	// Border
	border: string,
	borderColor: color,
	borderWidth: string,
	borderBottom: string,
	borderBottomColor: color,
	borderBottomStyle: borderStyle,
	borderBottomWidth: number,
	borderLeft: string,
	borderLeftColor: color,
	borderLeftStyle: borderStyle,
	borderLeftWidth: number,
	borderRight: string,
	borderRightColor: color,
	borderRightStyle: borderStyle,
	borderRightWidth: number,
	borderTop: string,
	borderTopColor: color,
	borderTopStyle: borderStyle,
	borderTopWidth: number,

	// Border-radius
	borderRadius: dimensionBox(Number),
	borderTopLeftRadius: number,
	borderTopRightRadius: number,
	borderBottomLeftRadius: number,
	borderBottomRightRadius: number,

	// Block
	width: length(['px', '%']),
	minWidth: length(['px', '%']),
	maxWidth: length(['px', '%']),
	height: length(['px', '%']),
	minHeight: length(['px', '%']),
	maxHeight: length(['px', '%']),
	padding: dimensionBox(Number),
	paddingTop: number,
	paddingRight: number,
	paddingBottom: number,
	paddingLeft: number,
	margin: dimensionBox(Number),
	marginTop: number,
	marginRight: number,
	marginBottom: number,
	marginLeft: number,
};