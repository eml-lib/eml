import { stringify as stringifyDimension } from '../types/dimension';

function padding({ top, right, bottom, left }) {
    return {
        paddingTop: stringifyDimension(top),
        paddingRight: stringifyDimension(right),
        paddingBottom: stringifyDimension(bottom),
        paddingLeft: stringifyDimension(left),
    };
}

function margin({ top, right, bottom, left }) {
    return {
        marginTop: stringifyDimension(top),
        marginRight: stringifyDimension(right),
        marginBottom: stringifyDimension(bottom),
        marginLeft: stringifyDimension(left),
    };
}

function background() {
    return {

    };
}

export default {
    padding,
    margin,
    background
};

// export function stringify({ left, top, right, bottom }) {
//     const directions = [left, top, right, bottom].filter(Boolean);
//     let property;
//
//     if (directions.length > 1) {
//         property = 'padding'
//     }
//
//     console.log('left, top, right, bottom', left, top, right, bottom);
//
//     return [left, top, right, bottom]
//         .map(dimension => dimension.value + dimension.unit)
//         .join(' ');
// }