const { createElement, Fragment } = require('../eml-core/build.js');

const Image = props => {
    const {
        src,
        width
    } = props;

    return (
        <img src={src} width={width} />
    )
};

export default Image;