// import { createElement } from 'eml-core';
const { createElement, Fragment } = require('../eml-core/build.js');
import { stringify as stringifyDimension } from "../../parsers/dimension";
import parsers from '../../parsers';

const IEBlockWrapper = props => {
    const {
        padding,
        background,
        color,
        fullWidth = false,
		border,
        borderRadius,
        children
    } = props;

    console.log(border);

    return (
        <table
            cellPadding="0"
            cellSpacing="0"
            border="0"
            role="presentation"
            bgcolor={ background ? parsers.color.stringify(background.color) : null }
            width={ fullWidth ? '100%' : null }
            style={{
            	border,
                borderRadius: borderRadius ? stringifyDimension(borderRadius) : null
            }}
        >
            { padding && padding.top ? (
                <tr>
                    <td colSpan="3" height={ padding.top.value }></td>
                </tr>
            ) : null }
            <tr>
                <td width={ padding && padding.left ? padding.left.value : 0 }></td>
                <td style={{ color: parsers.color.stringify(color) }}>
                    { children }
                </td>
                <td width={ padding && padding.right ? padding.right.value : 0 }></td>
            </tr>
            { padding && padding.bottom ? (
                <tr>
                    <td colSpan="3" height={ padding.bottom.value }></td>
                </tr>
            ) : null }
        </table>
    );
};

export default IEBlockWrapper;