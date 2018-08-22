import propTypes from 'prop-types';
import length from './length';
import dimensionBox from './dimension-box';
import url from './url';
import color from './color';

const { bool, number, string, oneOf } = propTypes;

const borderStyle = oneOf(['dotted', 'dashed', 'solid']);

export const element = {
	// Text
	color: color,
	fontSize: length(['px']),
	fontFamily: string,
	fontWeight: oneOf(['normal', 'bold', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
	lineHeight: length(['px']),
	letterSpacing: length(['px']),
	textDecoration: bool,
	textTransform: oneOf(['capitalize', 'uppercase', 'lowercase']),

	// Background
	backgroundColor: color,
	backgroundImage: url,
	backgroundPosition: string,
	backgroundRepeat: oneOf(['x', 'y']),

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
	borderRadius: string,
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
	padding: dimensionBox(length(['px', '%'])),
	paddingTop: number,
	paddingRight: number,
	paddingBottom: number,
	paddingLeft: number,
	margin: dimensionBox(length(['px', '%'])),
	marginTop: number,
	marginRight: number,
	marginBottom: number,
	marginLeft: number,
};