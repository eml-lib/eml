function dimension(value) {
    const match = String(value).match(/^(\d+)(px|%)*$/);

    if (match) {
        return {
            value: Number(match[1]),
            unit: match[2] || null
        };
    } else {
        return null;
    }
}

const parsers = {
    dimension
};

export { parsers };

export default (Component, parseFns) => (props, cxtOptions) => {
    const newProps = Object.entries(props).reduce((acc, [prop, value]) => ({
        ...acc,
        [prop]: prop in parseFns ? parseFns[prop](value) : value
    }), {});

    return Component(newProps, cxtOptions);
}