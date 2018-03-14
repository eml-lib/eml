export function parse(value) {
    if (typeof value === 'object') {
        return value;
    }

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
    return dimension ? dimension.value + dimension.unit : null;
}