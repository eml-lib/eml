// import { createElement } from 'eml-core';
const { createElement, Fragment } = require('../eml-core/build.js');
// import element from './element';
// import styles from '../styles';

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