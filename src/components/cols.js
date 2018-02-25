const { createElement } = require('../eml-core/build.js');
const { Fragment } = require('../eml-core/build.js');
import { parse as parseDimension, stringify as stringifyDimension } from "../parsers/dimension";
import element from './element';
import styles from '../styles';

const packToAlign = {
    'start': 'left',
    'center': 'center',
    'end': 'right'
};

const Col = props => {
    const {
        width,
        flex,
        backgroundColor,
        align,
        verticalAlign,
        children
    } = props;

    return (
        <td width={ width } align="left">
            { children }
        </td>
    )
};

const Cols = element(props => {
    const {
        gap,
        verticalAlign,
        padding,
        margin,
        children
    } = props;

    const childrenFlexes = children.reduce((acc, { props }) => (
        'flex' in props ? acc + Number(props.flex) : acc
    ), 0);

    function createFlexItemWithGap(child, i) {
        const { type: Child, props } = child;
        const width = 'flex' in props && props.flex > 0
            ? (props.flex / childrenFlexes * 100).toFixed() + '%'
            : null;

        const childComponent = (
            <Child width={ width }>
                { props.children }
            </Child>
        );

        return gap && i < children.length - 1
            ? (
                <Fragment>
                    { childComponent }
                    <td>
                        <div style={{ width: stringifyDimension(parseDimension(gap)) }}></div>
                    </td>
                </Fragment>
            )
            : childComponent;
    }

    console.log(children);

    return (
        <div
            style={{
                ...styles.padding(padding),
                ...styles.margin(margin)
            }}
        >
            <table
                cellPadding="0"
                cellSpacing="0"
                border="1"
                width="100%"
            >
                <tr>
                    { children.map(createFlexItemWithGap) }
                </tr>
            </table>
        </div>
    );
});

export { Cols, Col };