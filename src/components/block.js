import { createElement, Fragment } from 'eml-core';
import { text, decoration, block } from '../prop-types';
import * as lengthParser from '../parsers/length';
import { convert as convertColor } from '../parsers/color';
import compose from '../parsers/compose';
import convertText from '../parsers/text';
import convertBorder from '../parsers/border';
import convertBackground from '../parsers/border';
import convertMargin from '../parsers/margin';
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

		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,

        children
    } = props;

	const commonStyles = {
		...compose(props, [convertText, convertBorder, convertMargin])
	};

    const color = props.color ? convertColor(props.color) : null;

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
				bgcolor={ props.backgroundColor ? convertColor(props.backgroundColor) : null }
				width={ parsedProps.width ? lengthParser.stringifyHtmlAttr(parsedProps.width) : '100%' }
				style={{
					...commonStyles
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
							...convertBackground(props),
							color,
							...commonStyles
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