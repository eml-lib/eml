import { createElement, Fragment } from 'eml-core';
import { text, decoration, block } from '../prop-types';
import * as lengthParser from '../parsers/length';
import * as colorParser from '../parsers/color';
import convertText from '../parsers/text';
import convertBorder from '../parsers/border';
import * as dimensionBoxParser from '../parsers/dimension-box';
import { tableAsBlock as msoTableProps } from './helpers/mso-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

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
		background,
		// backgroundColor,
		backgroundImage,
		backgroundPosition,
		backgroundRepeat,

		width,
		minWidth,
		maxWidth,
		height,
		minHeight,
		maxHeight,

		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,

		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,

        children
    } = props;

    const textStyles = convertText(props);
    const borderStyles = convertBorder(props);

    const color = props.color ? colorParser.convert(props.color) : null;
    const backgroundColor = props.backgroundColor ? colorParser.convert(props.backgroundColor) : null;

    const parsedProps = {
		width: width ? lengthParser.parse(width, ['px', '%']) : null,
		height: height ? lengthParser.parse(height, 'px') : null,
		padding: dimensionBoxParser.parse(padding)
	};

    const contentColSize = 1;
    const colSpan = contentColSize + [parsedProps.padding.left, parsedProps.padding.right].filter(Boolean).length;

	return (
    	<Fragment>
			{ msoOpen }
			<table
				{...msoTableProps}
				bgcolor={ backgroundColor }
				width={ parsedProps.width ? lengthParser.stringifyHtmlAttr(parsedProps.width) : '100%' }
				style={{
					...textStyles,
					...borderStyles
				}}
			>
				{ renderYPadding(parsedProps.padding.top, colSpan) }
				<tr>
					{ renderXPadding(parsedProps.padding.left) }
					<td
						height={ parsedProps.height ? parsedProps.height.value - (parsedProps.padding.top + parsedProps.padding.bottom) : null }
						valign="top"
						style={{ color }}
					>
						{ msoClose }
						{ notMsoOpen }
						<div style={{
							boxSizing: 'border-box',
							width: parsedProps.width ? lengthParser.stringifyStyle(parsedProps.width) : null,
							height: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
							padding: dimensionBoxParser.stringify(parsedProps.padding),
							backgroundColor,
							color,
							...textStyles,
							...borderStyles
						}}>
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
	...text,
	...decoration,
	...block
};

export default Block;