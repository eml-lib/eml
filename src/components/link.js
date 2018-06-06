import { createElement } from 'eml-core';
import types from '../types';

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