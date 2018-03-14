// import { createElement } from 'eml-core';
const { createElement, Fragment } = require('../eml-core/build.js');
import { stringify as stringifyDimension } from "../../parsers/dimension";

const IEBlockWrapper = props => {
    const {
        padding,
        background,
        color,
        fullWidth = false,
        borderRadius,
        children
    } = props;

    return (
        <table
            cellPadding="0"
            cellSpacing="0"
            border="0"
            role="presentation"
            bgcolor={ background ? background.color : null }
            width={ fullWidth ? '100%' : null }
            style={{
                borderRadius: borderRadius ? stringifyDimension(borderRadius) : null
            }}
        >
            { padding.top ? (
                <tr>
                    <td colSpan="3" height={ padding.top.value }></td>
                </tr>
            ) : null }
            <tr>
                <td width={ padding.left ? padding.left.value : 0 }></td>
                <td style={{ color: color || null }}>
                    { children }
                </td>
                <td width={ padding.right ? padding.right.value : 0 }></td>
            </tr>
            { padding.bottom ? (
                <tr>
                    <td colSpan="3" height={ padding.bottom.value }></td>
                </tr>
            ) : null }
        </table>
    );
};

export default IEBlockWrapper;