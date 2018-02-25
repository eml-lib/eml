export function padding({ left, top, right, bottom }) {
    return {
        paddingLeft: left ? left.value + left.unit : null,
        paddingTop: top ? top.value + top.unit : null,
        paddingRight: right ? right.value + right.unit : null,
        paddingBottom: bottom ? bottom.value + bottom.unit : null,
    };
}

export function margin({ left, top, right, bottom }) {
    return {
        marginLeft: left ? left.value + left.unit : null,
        marginTop: top ? top.value + top.unit : null,
        marginRight: right ? right.value + right.unit : null,
        marginBottom: bottom ? bottom.value + bottom.unit : null,
    };
}

export default {
    padding,
    margin
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