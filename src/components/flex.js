const { createElement } = require('../eml-core/build.js');

export default ({ clients }) => {
    return {
        component({ orient, children }) {
            return (
                <div className="flex">
                    { children }
                </div>
            );
        },
        css: {
            '.flex': {}
        }
    };
}