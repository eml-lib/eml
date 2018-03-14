// import { createElement } from 'eml-core';
const { createElement } = require('../eml-core/build.js');
import colorConverter from 'css-color-converter';
import { parse as parseDimensionBox } from "../parsers/dimensionBox";
import { parse as parseDimension } from "../parsers/dimension";
import text from './text';

const element = Component => props => {
    const {
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,

        marginTop,
        marginRight,
        marginBottom,
        marginLeft,

        borderRadius,

        backgroundImage,
        // backgroundColor,
        backgroundPosition,
        backgroundRepeat,

        // text
        backgroundColor,
        color,

        children
    } = props;

    const padding = props.padding ? parseDimensionBox(props.padding) : {
        top: parseDimension(paddingTop),
        right: parseDimension(paddingRight),
        bottom: parseDimension(paddingBottom),
        left: parseDimension(paddingLeft),
    };

    const margin = props.margin ? parseDimensionBox(props.margin) : {
        top: parseDimension(marginTop),
        right: parseDimension(marginRight),
        bottom: parseDimension(marginBottom),
        left: parseDimension(marginLeft),
    };

    const background = {
        color: backgroundColor ? colorConverter(backgroundColor).toHexString() : null,
        image: backgroundImage,
    };

    return (
        <Component
            {...props}
            padding={padding}
            margin={margin}
            background={background}
            borderRadius={ borderRadius ? parseDimension(borderRadius) : null }
        >
            { children }
        </Component>
    );
};

export default element;