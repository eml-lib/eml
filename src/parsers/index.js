import * as dimension from './dimension';
import * as dimensionBox from './dimensionBox';

export const parsers = {
    dimension,
    dimensionBox
};

export default (Component, parseFns) => (props, cxtOptions) => {
    const newProps = Object.entries(props).reduce((acc, [prop, value]) => ({
        ...acc,
        [prop]: prop in parseFns ? parseFns[prop](value) : value
    }), {});

    return Component(newProps, cxtOptions);
}