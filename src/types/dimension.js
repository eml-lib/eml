export function parse(value) {
    if (typeof value === 'object') {
        return value;
    }

    const matched = String(value).match(/^(\d+)(px|%)*$/);

    if (!matched) {
        // throw new Error('Invalid parameter "' + value + '"');
        return null;
    }

    return {
        value: Number(matched[1]),
        unit: matched[2] || 'px'
    };
}

export function stringify(dimension) {
    return dimension ? dimension.value + dimension.unit : null;
}