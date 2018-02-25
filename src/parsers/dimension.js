export function parse(value) {
    const match = String(value).match(/^(\d+)(px|%)*$/);

    if (!match) {
        // throw new Error('Invalid parameter "' + value + '"');
        return null;
    }

    return {
        value: Number(match[1]),
        unit: match[2] || 'px'
    };
}

export function stringify(dimension) {
    return dimension.value + dimension.unit;
}