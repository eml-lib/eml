import * as number from './number';
import * as string from './string';
import * as oneOf from './oneOf';
import * as color from './color';
import * as dimension from './dimension';
import * as dimensionBox from './dimensionBox';
import textProps from '../prop-converters/textProps';
import elementProps from './elementProps';

export default {
	number,
	string,
	oneOf,
	color,
    dimension,
    dimensionBox,

	textProps,
	elementProps
};

// export default (Component, parseFns) => (props, cxtOptions) => {
//     const newProps = Object.entries(props).reduce((acc, [prop, value]) => ({
//         ...acc,
//         [prop]: prop in parseFns ? parseFns[prop](value) : value
//     }), {});
//
//     return Component(newProps, cxtOptions);
// }