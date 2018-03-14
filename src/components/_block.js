// import { createElement } from 'eml-core';
const { createElement, Fragment } = require('../eml-core/build.js');
// import { stringify as stringifyDimensionBox } from "../parsers/dimensionBox";
import IEBlockWrapper from './helpers/IEBlockWrapper';
import element from './element';
import styles from '../styles';

const BackgroundWrapper = ({ src, color }) => {
    return (
        `
            <!--[if gte mso 9]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
            <v:fill type="tile" src="${src}" color="${color}"/>
            </v:rect>
            <![endif]-->
        `
    );
};

const Block = element(props => {
    const {
        padding,
        margin,
        background,
        color,
        children
    } = props;

    return (
        <div style={{
            ...styles.margin(margin),
            // backgroundColor: backgroundColor || null,
            // color: color || null,
        }}>

            { background && background.image ? (
                <BackgroundWrapper src={ background.image } color={ background.color } />
            ) : null }

            <IEBlockWrapper padding={padding} fullWidth={true} background={background} color={color}>
                { children }
            </IEBlockWrapper>
        </div>
    )
});

export default Block;