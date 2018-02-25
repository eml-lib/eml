const { createElement } = require('../eml-core/build.js');
const { Fragment } = require('../eml-core/build.js');

const packToAlign = {
    'start': 'left',
    'center': 'center',
    'end': 'right'
};


const Flex = ({ gap, align, pack, children }) => {
    const childrenFlexes = children.reduce(
        (acc, { props }) => 'flex' in props ? acc + Number(props.flex) : acc,
        0
    );

    function createFlexItem(props) {
        const width = 'flex' in props && props.flex > 0 && childrenFlexes > 0
            ? (props.flex / childrenFlexes * 100).toFixed() + '%'
            : null;

        return (
            <td width={ width } align="left">
                { props.children }
            </td>
        );
    }

    function createGap() {
        return (
            <td>
                <div style={{ width: gap + 'px' }}></div>
            </td>
        );
    }

    function createFlexItemWithGap(props, i) {
        return (
            <Fragment>
                { createFlexItem(props) }
                { i < children.length - 1 ? createGap() : null }
            </Fragment>
        );
    }

    const childNodes = gap
        ? children.reduce((acc, child, i) => [...acc, createFlexItemWithGap(child.props, i)], [])
        : children.map(child => createFlexItem(child.props));

    return (
        <div align={ pack && pack in packToAlign ? packToAlign[pack] : 'left' }>
            <table cellPadding="0" cellSpacing="0" border="0" width={ childrenFlexes > 0 ? '100%' : null }>
                <tr>
                    { childNodes }
                </tr>
            </table>
        </div>
    );
};

export { Flex };