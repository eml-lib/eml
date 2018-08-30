import { createElement, Fragment } from 'eml-core';
import elementTypes from '../props/element-types';
import * as lengthParser from '../props/parsers/length';
import * as paddingParser from '../props/padding';
// import * as marginParser from '../props/margin';
import backgroundPropsToStyles from '../props/props-to-styles/background';
import textPropsToStyles from '../props/props-to-styles/text';
import borderPropsToStyles from '../props/props-to-styles/border';
import { convert as convertColor } from '../props/parsers/color';
import msoTableProps from './helpers/mso-table-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

const renderYPadding = (padding, colSpan) => (
	padding > 0 ? (
		<tr>
			<td colSpan={colSpan} height={padding} style={{ fontSize: 0 }}>&nbsp;</td>
		</tr>
	) : null
);

const renderXPadding = padding => (
	padding > 0 ? (
		<td width={padding} style={{ fontSize: 0 }}>&nbsp;</td>
	) : null
);

const Block = (props, contextProps) => {
	const {
		width,
		minWidth,
		maxWidth,
		height,
		minHeight,
		maxHeight,

        children
    } = props;

	const mixedProps = { ...props, ...contextProps };

	const commonStyles = {
		...textPropsToStyles(mixedProps),
		...borderPropsToStyles(mixedProps),
		// ...marginParser.filterProps(props)
	};

	const parsedProps = {
		width: width ? lengthParser.parse(width, ['px', '%']) : null,
		minWidth: minWidth ? lengthParser.parse(minWidth, ['px', '%']) : null,
		maxWidth: maxWidth ? lengthParser.parse(maxWidth, ['px', '%']) : null,
		height: height ? lengthParser.parse(height, ['px', '%']) : null,
		minHeight: minHeight ? lengthParser.parse(minHeight, ['px', '%']) : null,
		maxHeight: maxHeight ? lengthParser.parse(maxHeight, ['px', '%']) : null,
		padding: paddingParser.parse(props)
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
				style={ commonStyles }
			>
				{ renderYPadding(parsedProps.padding.top, colSpan) }
				<tr>
					{ renderXPadding(parsedProps.padding.left) }
					<td
						height={
							parsedProps.height
								? parsedProps.height.value - (parsedProps.padding.top + parsedProps.padding.bottom)
								: null
						}
						valign="top"
					>
						{ msoClose }
						{ notMsoOpen }
						<div style={{
							...commonStyles,
							...backgroundPropsToStyles(props),
							boxSizing: 'border-box',
							width: parsedProps.width ? lengthParser.stringifyStyle(parsedProps.width) : null,
							height: parsedProps.height ? lengthParser.stringifyStyle(parsedProps.height) : null,
							padding: paddingParser.stringify(parsedProps.padding)
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
	...elementTypes
};

export default Block;
