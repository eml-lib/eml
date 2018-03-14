import { parse as parseDimension } from './dimension';

export function parse(value) {
    if (typeof value === 'object') {
        return value;
    }

    const split = value !== '' ? value.split(' ') : null;

    if (!Array.isArray(split) || !split.length) {
        // throw new Error('Invalid parameter "' + value + '"');
        return null;
    }

    const [
        top,
        right = top,
        bottom = top,
        left = right
    ] = split;

    return {
        top: parseDimension(top),
        right: parseDimension(right),
        bottom: parseDimension(bottom),
        left: parseDimension(left),
    }
}

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