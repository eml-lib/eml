const { createElement, Fragment } = require('../eml-core/build.js');
import parsers from '../parsers';

const Link = props => {
    const {
        to,
        color,
        textDecoration,

        children,
    } = props;

    const styles = {
        color: color || null,
        textDecoration: textDecoration || null
    };

    return (
    	<a href={to} style={styles}>
			{ children }
        </a>
    );
};

export default Link;