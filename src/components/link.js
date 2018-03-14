// import { createElement } from 'eml-core';
import IEBlockWrapper from './helpers/IEBlockWrapper';
import element from "./element";

const { createElement, Fragment } = require('../eml-core/build.js');

export default element(props => {
    const {
        to,
        color,
        textDecoration,
        backgroundColor,
        padding,
        borderRadius,
        children,
    } = props;

    const styles = {
        color: color || null,
        textDecoration: textDecoration || null,
        backgroundColor: backgroundColor || null
    };

    return (
        <IEBlockWrapper
            padding={padding}
            background={{ color: backgroundColor }}
            borderRadius={borderRadius}
        >
            <a href={to} style={styles}>
                {props.children}
            </a>
        </IEBlockWrapper>
    );
})