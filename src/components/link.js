import { createElement, Fragment, renderHtmlAttributes } from 'eml-core';
import propTypes from 'prop-types';
import url from '../prop-types/url';
import { parse as parseLength, stringifyStyle as stringifyStyleLength, stringifyHtmlAttr as stringifyHtmlAttrLength } from '../converters/length';
import { parse as parseDimensionBox, stringify as stringifyDimensionBox } from '../converters/dimension-box';
import { parse as parseColor, stringify as stringifyColor } from '../converters/color';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
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

	const converted = {
		width: width ? parseLength(width, 'px') : null,
		height: height ? parseLength(height, 'px') : null,
		backgroundColor: backgroundColor ? parseColor(backgroundColor) : null,
		color: color ? parseColor(color) : null,
		padding: parseDimensionBox(padding)
	};

	const isBlock = (
		[converted.padding.top, converted.padding.right, converted.padding.bottom, converted.padding.left].some(length => length.value !== 0)
		|| converted.width
		|| converted.height
	);

	const commonStyles = {
		backgroundColor: converted.backgroundColor ? stringifyColor(converted.backgroundColor) : null,
		color: converted.color ? stringifyColor(converted.color) : null,
		textDecoration: noUnderline ? 'none' : 'underline'
	};

	if (isBlock) {
		return (
			<Fragment>
				{ msoOpen }
				<table
					{...ieTableProps}
					bgcolor={converted.backgroundColor ? stringifyColor(converted.backgroundColor) : null}
					width={converted.width ? stringifyHtmlAttrLength(converted.width) : null}
					style={{ border: border || null }}
				>
					<td
						align="center"
						valign="middle"
						height={converted.height ? stringifyHtmlAttrLength(converted.height) : null}
					>
						<a href={to} style={{
							...commonStyles,
							msoPaddingAlt: converted.padding ? stringifyDimensionBox(converted.padding) : null,
							// Без `borderTop` и `borderBottom` не будет работать `msoPaddingAlt`
							...(converted.backgroundColor ? {
								borderTop: `1px solid ${stringifyColor(converted.backgroundColor)}`,
								borderBottom: `1px solid ${stringifyColor(converted.backgroundColor)}`
							} : {})
						}}>
							{ msoClose }
							{ notMsoOpen }
							<a href={to} style={{
								...commonStyles,
								display: 'inline-block',
								boxSizing: 'border-box',
								padding: stringifyDimensionBox(converted.padding),
								width: converted.width ? stringifyStyleLength(converted.width) : null,
								height: converted.height ? stringifyStyleLength(converted.height) : null,
								lineHeight: converted.height ? stringifyStyleLength(converted.height) : null,
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
					padding: stringifyDimensionBox(converted.padding)
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