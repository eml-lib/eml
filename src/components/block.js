const { createElement } = require('../eml-core/build.js');
// import { stringify as stringifyDimensionBox } from "../parsers/dimensionBox";
import element from './element';
import styles from '../styles';

const Block = element(props => {
    const {
        padding,
        margin,
        // backgroundColor,
        // color,
        children
    } = props;

    console.log('margin', margin);

    return (
        <div style={{
            ...styles.padding(padding),
            ...styles.margin(margin),
            // backgroundColor: backgroundColor || null,
            // color: color || null,
        }}>
            { children }
        </div>
    )
});

export default Block;