import parseProps, { parsers } from '../parsers/index';
const { createElement } = require('../eml-core/build.js');

const Flex = ({ width, children }) => {

    console.log(width);

    return (
        <div className="flex" style={{ border: '1px solid red', fontFamily: 'Tahoma' }}>
            <div>{ children }</div>
        </div>
    );
};

Flex.css = () => ({
    '.b': {
        border: '1px solid red'
    },
    '.c': {
        fontWeight: 'bold',
        fontFamily: 'Verdana'
    }
});

export default parseProps(Flex, {
    width: parsers.dimension
});