import core from 'eml-core';
const { createElement, Fragment } = core;
// import { createElement, Fragment } from 'eml-core';
import types from '../../types';
import { tableAsBlock as ieTableProps } from './ie-props';

const renderYPadding = (padding, colSpan) => (
	padding > 0 ? (
		<tr>
			<td colSpan={colSpan} height={value} />
		</tr>
	) : null
);

const renderXPadding = (padding) => (
	padding > 0 ? (
		<td width={padding} />
	) : null
);

export default props => {
    const {
    	paddingLeft = 0,
		paddingTop = 0,
		paddingRight = 0,
		paddingBottom = 0,
        background,
        color,
        fullWidth = false,
		border,
        borderRadius,
        children
    } = props;

    const contentColSize = 1;
    const colSpan = contentColSize + [paddingLeft, paddingRight].filter(value => value > 0).length;

    return (
		<table
			{...ieTableProps}
			// bgColor={ background ? types.color.stringify(background.color) : null }
			bgColor={ background ? background.color : null }
			width={ fullWidth ? '100%' : null }
			style={{
				border,
				// borderRadius: borderRadius ? types.dimension.stringify(borderRadius) : null
			}}
		>
			{ renderYPadding(paddingTop, colSpan) }
			<tr>
				{ renderXPadding(paddingLeft) }
				<td
					// style={{ color: color ? types.color.stringify(color) : null }}
				>
					{ children }
				</td>
				{ renderXPadding(paddingRight) }
			</tr>
			{ renderYPadding(paddingBottom, colSpan) }
		</table>
    );
};