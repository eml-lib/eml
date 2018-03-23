const { createElement } = require('../eml-core/build.js');

const text = props => {
    const {
        color,
        children
    } = props;

    return (
        <span style={{ color }}>
            { children }
        </span>
    )
};

export default text;