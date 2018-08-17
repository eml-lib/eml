import { createElement, Fragment, renderHtmlAttributes } from 'eml-core';
import propTypes from 'prop-types';
import url from '../prop-types/url';
import * as lengthParser from '../parsers/length';
import * as colorParser from '../parsers/color';
import * as dimensionBoxParser from '../parsers/dimension-box';
import { tableAsBlock as msoTableProps } from './helpers/mso-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
const { bool } = propTypes;

const renderYPadding = (padding, colSpan) => (
	padding > 0 ? (
		<tr>
			<td colSpan={colSpan} height={padding} style={{ fontSize: 0 }}>&nbsp;</td>
		</tr>
	) : null
);

const renderXPadding = (padding) => (
	padding > 0 ? (
		<td width={padding} style={{ fontSize: 0 }}>&nbsp;</td>
	) : null
);

const Link = props => {
	const {
		to,
		noUnderline,

		padding,
		width,
		height,
		backgroundColor,
		border,
		borderRadius,
		color,
		children
	} = props;

	const parsedProps = {
		width: width ? lengthParser.parse(width, 'px') : null,
		height: height ? lengthParser.parse(height, 'px') : null,
		backgroundColor: backgroundColor ? colorParser.parse(backgroundColor) : null,
		color: color ? colorParser.parse(color) : null,
		padding: dimensionBoxParser.parse(padding)
	};

	const isBlock = (
		[parsedProps.padding.top, parsedProps.padding.right, parsedProps.padding.bottom, parsedProps.padding.left].some(length => length.value !== 0)
		|| parsedProps.width
		|| parsedProps.height
	);

	const commonStyles = {
		backgroundColor: parsedProps.backgroundColor ? colorParser.stringify(parsedProps.backgroundColor) : null,
		color: parsedProps.color ? colorParser.stringify(parsedProps.color) : null,
		textDecoration: noUnderline ? 'none' : 'underline'
	};

	if (isBlock) {
		return (
			<Fragment>
				{ msoOpen }
				<table
					{...msoTableProps}
					bgcolor={parsedProps.backgroundColor ? colorParser.stringify(parsedProps.backgroundColor) : null}
					width={parsedProps.width ? lengthParser.stringifyHtmlAttr(parsedProps.width) : null}
					style={{ border: border || null }}
				>
					<td
						align="center"
						valign="middle"
						height={parsedProps.height ? lengthParser.stringifyHtmlAttr(parsedProps.height) : null}
					>
						<a href={to} style={{
							...commonStyles,
							msoPaddingAlt: parsedProps.padding ? dimensionBoxParser.stringify(parsedProps.padding) : null,
							// Без `borderTop` и `borderBottom` не будет работать `msoPaddingAlt`
							...(parsedProps.backgroundColor && {
								borderTop: `1px solid ${colorParser.stringify(parsedProps.backgroundColor)}`,
								borderBottom: `1px solid ${colorParser.stringify(parsedProps.backgroundColor)}`
							})
						}}>
							{ msoClose }
							{ notMsoOpen }
							<a href={to} style={{
								...commonStyles,
								display: 'inline-block',
								boxSizing: 'border-box',
								padding: dimensionBoxParser.stringify(parsedProps.padding),
								width: parsedProps.width ? lengthParser.stringifyStyle(parsedProps.width) : null,
								height: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
								lineHeight: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
								textAlign: 'center',
								border: border || null,
								borderRadius: borderRadius || null
							}}>
								{ notMsoClose }
								{ children }
								{ notMsoOpen }
							</a>
							{ notMsoClose }
							{ msoOpen }
						</a>
					</td>
				</table>
				{ msoClose }
			</Fragment>
		);

	} else {
		return (
			<a
				href={to}
				style={{
					...commonStyles,
					...(isBlock ? { display: 'inline-block' } : null),
					padding: dimensionBoxParser.stringify(parsedProps.padding)
				}}
			>
				{ children }
			</a>
		);
	}

	// if (isBlock) {
	// 	const contentColSize = 1;
	// 	const colSpan = contentColSize + [paddingLeft, paddingRight].filter(value => value > 0).length;
	// } else if (width && height) {
	// 	return (
	// 		<div>
	// 			{ msoOpen }
	// 			{ `<v:rect ${
	// 				renderHtmlAttributes({
	// 					'xmlns:v': 'urn:schemas-microsoft-com:vml',
	// 					'xmlns:w': 'urn:schemas-microsoft-com:office:word',
	// 					href: to,
	// 					style: {
	// 						width: types.dimension.stringify(width),
	// 						height: types.dimension.stringify(height),
	// 						vTextAnchor: 'middle'
	// 					},
	// 					stroke: false,
	// 					fillcolor: background ? colorConverter(background).toHexString() : null
	// 				})
	// 			}>` }
	// 			{ `<w:anchorlock />` }
	// 				<center>
	// 					{ msoClose }
	// 					<a href={to} style={{
	// 						...commonStyles,
	// 						display: 'inline-block',
	// 						textAlign: 'center',
	// 						width: types.dimension.stringify(width),
	// 						lineHeight: types.dimension.stringify(height)
	// 					}}>
	// 						{ children }
	// 					</a>
	// 					{ msoOpen }
	// 				</center>
	// 			{ `</v:rect>` }
	// 			{ msoClose }
	// 		</div>
	// 	);
};

Link.defaultProps = {
	padding: 0
};

Link.propTypes = {
	to: url.isRequired,
	noUnderline: bool
};

export default Link;