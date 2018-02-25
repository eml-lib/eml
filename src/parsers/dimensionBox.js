import { parse as parseDimension } from './dimension';

export function parse(value) {
    const split = value !== '' ? value.split(' ') : null;

    if (!Array.isArray(split) || !split.length) {
        // throw new Error('Invalid parameter "' + value + '"');
        return null;
    }

    const [
        left,
        top = left,
        right = left,
        bottom = top
    ] = split;

    return {
        left: parseDimension(left),
        top: parseDimension(top),
        right: parseDimension(right),
        bottom: parseDimension(bottom)
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