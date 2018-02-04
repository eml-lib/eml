const { createElement } = require('../eml-core/build.js');

export default props => {
    return (
        <a href={ props.href }>{ props.content }</a>
    );
}