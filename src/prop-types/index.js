import propTypes from 'prop-types';
import url from './url';
import color from './color';

const { bool, number, string, oneOf } = propTypes;

export const text = {
	color: color,
	fontSize: number,
	fontFamily: string,
	fontWeight: oneOf(['normal', 'bold', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
	lineHeight: number,
	letterSpacing: number,
	textDecoration: bool,
	textTransform: oneOf(['capitalize', 'uppercase', 'lowercase']),
};

export const decoration = {
	backgroundColor: color,
	backgroundImage: url,
	backgroundPosition: string,
	backgroundRepeat: oneOf(['x', 'y']),

	border: string,
	borderColor: color,
	borderWidth: string,
	borderBottom: string,
	borderBottomColor: color,
	borderBottomStyle: string,
	borderBottomWidth: string,
	borderLeft: string,
	borderLeftColor: color,
	borderLeftStyle: string,
	borderLeftWidth: string,
	borderRight: string,
	borderRightColor: color,
	borderRightStyle: string,
	borderRightWidth: string,
	borderTop: string,
	borderTopColor: color,
	borderTopStyle: string,
	borderTopWidth: string,

	borderRadius: string,
	borderTopLeftRadius: string,
	borderTopRightRadius: string,
	borderBottomLeftRadius: string,
	borderBottomRightRadius: string
};

export const block = {
	width: number,
	minWidth: number,
	maxWidth: number,
	height: number,
	minHeight: number,
	maxHeight: number,
	padding: string,
	paddingTop: string,
	paddingRight: string,
	paddingBottom: string,
	paddingLeft: string,
	margin: string,
	marginTop: string,
	marginRight: string,
	marginBottom: string,
	marginLeft: string,
	// align: oneOf(['start', 'center', 'end'])
};