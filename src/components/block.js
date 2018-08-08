import { createElement, Fragment } from 'eml-core';
import propTypes from 'prop-types';
import color from '../prop-types/color';
import * as lengthParser from '../parsers/length';
import * as colorParser from '../parsers/color';
import * as dimensionBoxParser from '../parsers/dimension-box';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

const { number, oneOf } = propTypes;

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

const Block = props => {
    const {
		width,
		height,
		padding,
		border,
        borderRadius,

		backgroundColor,

        color,
		fontSize,
		fontFamily,
		fontWeight,
		lineHeight,
		letterSpacing,
		textDecoration,
		textTransform,

        children
    } = props;

    const parsedProps = {
		width: width ? lengthParser.parse(width, 'px') : null,
		height: height ? lengthParser.parse(height, 'px') : null,
		padding: dimensionBoxParser.parse(padding),
		backgroundColor: backgroundColor ? colorParser.parse(backgroundColor) : null,
		color: color ? colorParser.parse(color) : null,
	};

    const contentColSize = 1;
    const colSpan = contentColSize + [parsedProps.padding.left, parsedProps.padding.right].filter(Boolean).length;

	return (
    	<Fragment>
			{ msoOpen }
			<table
				{...ieTableProps}
				bgcolor={ parsedProps.backgroundColor ? colorParser.stringify(parsedProps.backgroundColor) : null }
				width={ parsedProps.width ? lengthParser.stringifyHtmlAttr(parsedProps.width) : null }
				style={{ border }}
			>
				{ renderYPadding(parsedProps.padding.top, colSpan) }
				<tr>
					{ renderXPadding(parsedProps.padding.left) }
					<td
						height={ parsedProps.height ? parsedProps.height.value - (parsedProps.padding.top + parsedProps.padding.bottom) : null }
						valign="top"
						style={{ color: parsedProps.color ? colorParser.stringify(parsedProps.color) : null }}
					>
						{ msoClose }
						{ notMsoOpen }
						<div
							className="block"
							style={{
								width: parsedProps.width ? lengthParser.stringifyStyle(parsedProps.width) : null,
								height: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
								padding: dimensionBoxParser.stringify(parsedProps.padding),
								backgroundColor: parsedProps.backgroundColor ? colorParser.stringify(parsedProps.backgroundColor) : null
							}}
						>
							{ notMsoClose }
							{ children }
							{ notMsoOpen }
						</div>
						{ notMsoClose }
						{ msoOpen }
					</td>
					{ renderXPadding(parsedProps.padding.right) }
				</tr>
				{ renderYPadding(parsedProps.padding.bottom, colSpan) }
			</table>
			{ msoClose }
		</Fragment>
    );
};

Block.defaultProps = {
	padding: 0
};

Block.propTypes = {
	fontSize: number,
	fontWeight: oneOf(['normal', 'bold']),
	backgroundColor: color,
	color: color
};

Block.css = {
	'.block': {
		boxSizing: 'border-box'
	}
};

export default Block;