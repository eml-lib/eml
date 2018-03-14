const { createElement, Fragment } = require('../eml-core/build.js');
import styles from "../styles";
import { stringify as stringifyDimension } from "../parsers/dimension";
import IEBlockWrapper from './helpers/IEBlockWrapper';
import element from './element';

const packToAlign = {
    'start': 'left',
    'center': 'center',
    'end': 'right'
};

const alignToValign = {
    'start': 'top',
    'center': 'middle',
    'end': 'bottom'
};

const Block = element(props => {
    const {
        padding,
        margin,
        border,
        borderLeft,
        borderTop,
        borderRight,
        borderBottom,
        borderRadius,
        background,
        color,
        flowDirection = 'row',
        pack = 'start',
        align = 'start',
        selfPack,
        selfAlign,
        gap,
        children
    } = props;

    const childrenFlexes = children.reduce(
        (acc, { props }) => props && 'flex' in props ? acc + Number(props.flex) : acc,
        0
    );

    function createFlexItem(child) {
        const { props } = child;
        const width = (props && 'flex' in props && props.flex > 0) ? (props.flex / childrenFlexes * 100).toFixed() + '%' : null;
        const align = (props && 'selfPack' in props) ? packToAlign[props.selfPack] : 'left';
        const valign = (props && 'selfAlign' in props) ? alignToValign[props.selfAlign] : 'top';

        const body = typeof child === 'object'
            ? {
                ...child,
                props: {
                    ...child.props,
                    width: width ? '100%' : null
                }
            }
            : child;

        return (
            <td width={width} align={align} valign={valign}>
                { body }
            </td>
        );
    }

    function createGap() {
        return (
            <td>
                <table cellPadding={0} cellSpacing={0} width={gap}><tr><td/></tr></table>
            </td>
        );
    }

    function createFlexItemWithGap(child, i) {
        return (
            <Fragment>
                { createFlexItem(child) }
                { i < children.length - 1 ? createGap() : null }
            </Fragment>
        );
    }

    const childNodes = gap
        ? children.reduce((acc, child, i) => [...acc, createFlexItemWithGap(child, i)], [])
        : children.map(createFlexItem);
    let body;

    if (flowDirection === 'row') {
        body = (
            <IEBlockWrapper
                padding={padding}
                fullWidth={childrenFlexes > 0 || props.width}
                background={background}
                color={color}
            >
                <div align={ pack && pack in packToAlign ? packToAlign[pack] : 'left' }>
                    <table
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        width={childrenFlexes > 0 ? '100%' : null}
                        style={{
                            border,
                            borderLeft,
                            borderTop,
                            borderRight,
                            borderBottom,
                            borderRadius: borderRadius ? stringifyDimension(borderRadius) : null,
                        }}>
                        <tr>
                            { childNodes }
                        </tr>
                    </table>
                </div>
            </IEBlockWrapper>
        );
    } else {
        body = (
            <IEBlockWrapper
                padding={margin}
                fullWidth={childrenFlexes > 0 || props.width}
            >
                <IEBlockWrapper
                    padding={padding}
                    fullWidth={childrenFlexes > 0 || props.width}
                    background={background}
                    color={color}
                >
                    { children.map(child => {
                        if (typeof child === 'object') {
                            return {
                                ...child,
                                props: {
                                    ...child.props,
                                    width: props.align && props.align === 'justify' ? '100%' : null
                                }
                            };
                        } else {
                            return child;
                        }
                    }) }
                </IEBlockWrapper>
            </IEBlockWrapper>
        );
    }

    return body;

    // return props.backgroundImage ? (
    //     <table cellPadding={0} cellSpacing={0} border={0} width="100%">
    //         <tr>
    //             <td background={props.backgroundImage} bgcolor="#7bceeb" valign="top">
    //         { '<!--[if gte mso 9]>' }
    //         { `<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 300px">` }
    //         { `<v:fill origin="0.5, 0" position="0.5, 0" type="tile" src="${props.backgroundImage}" />` }
    //         { `<v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">` }
    //         { '<![endif]-->' }
    //         { body }
    //         { `<!--[if gte mso 9]>` }
    //         { `</v:textbox>` }
    //         { `</v:rect>` }
    //         { '<![endif]-->' }
    //             </td>
    //         </tr>
    //     </table>
    // ) : (
    //     <div>
    //         { body }
    //     </div>
    // );
});

export default Block;