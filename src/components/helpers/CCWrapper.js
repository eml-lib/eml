const { createElement } = require('../eml-core/build.js');

const CCWrapper = ({ children }) => {
    return (
        <div>
            { '<!--[if mso | IE]>' }
            { children }
            { '<![endif]-->' }
        </div>
    );
};

export default CCWrapper;