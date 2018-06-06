import { createElement } from 'eml-core';
import { stringify as stringifyDimension } from '../../parsers/dimension';
import parsers from '../../parsers';

export default props => {
    const {
        padding,
        background,
        color,
        fullWidth = false,
		border,
        borderRadius,
        children
    } = props;

	const paddingValues = {
		left: padding && padding.left ? padding.left.value : 0,
		top: padding && padding.top ? padding.top.value : 0,
		right: padding && padding.right ? padding.right.value : 0,
		bottom: padding.bottom ? padding.bottom.value : 0
	};

    const contentColSize = 1;
    const colSpan = contentColSize + [paddingValues.left, paddingValues.right].filter(value => value > 0).length;

    return (
        <table
            cellPadding="0"
            cellSpacing="0"
            border="0"
            role="presentation"
            bgColor={ background ? parsers.color.stringify(background.color) : null }
            width={ fullWidth ? '100%' : null }
            style={{
            	border,
                borderRadius: borderRadius ? stringifyDimension(borderRadius) : null
            }}
        >
            { paddingValues.top > 0 ? (
                <tr>
                    <td colSpan={colSpan} height={ paddingValues.top } />
                </tr>
            ) : null }
            <tr>
				{ paddingValues.left > 0 ? (
					<td width={ paddingValues.left } />
				) : null }
                <td style={{ color: parsers.color.stringify(color) }}>
                    { children }
                </td>
				{ paddingValues.right > 0 ? (
					<td width={ paddingValues.right } />
				) : null }
            </tr>
            { paddingValues.bottom > 0 ? (
                <tr>
                    <td colSpan={colSpan} height={ paddingValues.bottom } />
                </tr>
            ) : null }
        </table>
    );
};