const { createElement } = require('../eml-core/build.js');
import { parse as parseDimensionBox } from "../parsers/dimensionBox";
import { parse as parseDimension } from "../parsers/dimension";

const element = Component => props => {
    const {
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        marginLeft,
        marginTop,
        marginRight,
        marginBottom,
        children
    } = props;

    const padding = props.padding ? parseDimensionBox(props.padding) : {
        left: parseDimension(paddingLeft),
        top: parseDimension(paddingTop),
        right: parseDimension(paddingRight),
        bottom: parseDimension(paddingBottom)
    };

    const margin = props.margin ? parseDimensionBox(props.margin) : {
        left: parseDimension(marginLeft),
        top: parseDimension(marginTop),
        right: parseDimension(marginRight),
        bottom: parseDimension(marginBottom)
    };

    return (
        <Component
            {...props}
            padding={padding}
            margin={margin}
        >
            { children }
        </Component>
    );
};

export default element;