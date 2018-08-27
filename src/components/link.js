import { createElement, Fragment, renderHtmlAttributes } from 'eml-core';
import propTypes from 'prop-types';
import elementTypes from '../props/element-types';
import url from '../props/types/url';
import * as lengthParser from '../props/parsers/length';
import * as paddingParser from '../props/padding';
import textPropsToStyles from '../props/props-to-styles/text';
import { convert as convertColor } from '../props/parsers/color';
import msoTableProps from './helpers/mso-table-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
const { bool } = propTypes;

// const renderYPadding = (padding, colSpan) => (
// 	padding > 0 ? (
// 		<tr>
// 			<td colSpan={colSpan} height={padding} style={{ fontSize: 0 }}>&nbsp;</td>
// 		</tr>
// 	) : null
// );
//
// const renderXPadding = (padding) => (
// 	padding > 0 ? (
// 		<td width={padding} style={{ fontSize: 0 }}>&nbsp;</td>
// 	) : null
// );

const Link = props => {
	const {
		to,
		// padding,
		width,
		height,
		// textDecoration,
		border,
		borderRadius,
		children
	} = props;

	const backgroundColor = props.backgroundColor ? convertColor(props.backgroundColor) : null;
	const color = props.color ? convertColor(props.color) : null;

	const parsedProps = {
		width: width ? lengthParser.parse(width, ['px', '%']) : null,
		height: height ? lengthParser.parse(height, ['px', '%']) : null,
		borderRadius: borderRadius ? lengthParser.parse(borderRadius, ['px']) : null,
		padding: paddingParser.parse(props)
	};

	const isBlock = (
		// [parsedProps.padding.top, parsedProps.padding.right, parsedProps.padding.bottom, parsedProps.padding.left].some(length => length.value > 0)
		[parsedProps.padding.top, parsedProps.padding.right, parsedProps.padding.bottom, parsedProps.padding.left].some(length => length > 0)
		|| parsedProps.width
		|| parsedProps.height
	);

	const commonStyles = {
		...textPropsToStyles(props),
		boxSizing: 'border-box',
		display: 'inline-block',
		backgroundColor,
		color
	};

	console.log('commonStyles', commonStyles.textDecoration);

	if (isBlock) {
		return (
			<Fragment>
				{ msoOpen }
				<table
					{...msoTableProps}
					bgcolor={backgroundColor}
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
							padding: paddingParser.stringify(parsedProps.padding),
							msoPaddingAlt: parsedProps.padding ? paddingParser.stringify(parsedProps.padding) : null,
							// Без `borderTop` и `borderBottom` не будет работать `msoPaddingAlt`
							...(backgroundColor && {
								borderTop: `1px solid ${backgroundColor}`,
								borderBottom: `1px solid ${backgroundColor}`
							})
						}}>
							{ msoClose }
							{ notMsoOpen }
							<a href={to} style={{
								...commonStyles,
								padding: paddingParser.stringify(parsedProps.padding),
								width: parsedProps.width ? lengthParser.stringifyStyle(parsedProps.width) : null,
								height: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
								lineHeight: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
								textAlign: 'center',
								border: border || null,
								borderRadius: borderRadius ? lengthParser.stringifyStyle(parsedProps.borderRadius) : null
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
					padding: paddingParser.stringify(parsedProps.padding)
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
	...elementTypes,
	to: url.isRequired
};

export default Link;