import { createElement, Fragment } from 'eml-core';
import propTypes from 'prop-types';
import { parse as parseLength, stringifyStyle as stringifyStyleLength, stringifyHtmlAttr as stringifyHtmlAttrLength } from '../converters/length';
import { parse as parseDimensionBox, stringify as stringifyDimensionBox } from '../converters/dimension-box';
import { parse as parseColor, stringify as stringifyColor } from '../converters/color';
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

    const converted = {
		width: width ? parseLength(width, 'px') : null,
		height: height ? parseLength(height, 'px') : null,
		padding: parseDimensionBox(padding),
		backgroundColor: backgroundColor ? parseColor(backgroundColor) : null,
		color: color ? parseColor(color) : null,
	};

    const contentColSize = 1;
    const colSpan = contentColSize + [converted.padding.left, converted.padding.right].filter(Boolean).length;

	return (
    	<Fragment>
			{ msoOpen }
			<table
				{...ieTableProps}
				bgcolor={ converted.backgroundColor ? stringifyColor(converted.backgroundColor) : null }
				width={ converted.width ? stringifyHtmlAttrLength(converted.width) : null }
				style={{ border }}
			>
				{ renderYPadding(converted.padding.top, colSpan) }
				<tr>
					{ renderXPadding(converted.padding.left) }
					<td
						height={ converted.height ? converted.height.value - (converted.padding.top + converted.padding.bottom) : null }
						valign="top"
						style={{ color: converted.color ? stringifyColor(converted.color) : null }}
					>
						{ msoClose }
						{ notMsoOpen }
						<div
							className="block"
							style={{
								width: converted.width ? stringifyStyleLength(converted.width) : null,
								height: converted.height ? stringifyStyleLength(converted.height) : null,
								padding: stringifyDimensionBox(converted.padding),
								backgroundColor: converted.backgroundColor ? stringifyColor(converted.backgroundColor) : null
							}}
						>
							{ notMsoClose }
							{ children }
							{ notMsoOpen }
						</div>
						{ notMsoClose }
						{ msoOpen }
					</td>
					{ renderXPadding(converted.padding.right) }
				</tr>
				{ renderYPadding(converted.padding.bottom, colSpan) }
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
	fontWeight: oneOf(['normal', 'bold'])
};

Block.css = {
	'.block': {
		boxSizing: 'border-box'
	}
};

export default Block;