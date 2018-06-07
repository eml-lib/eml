// import warning from 'warning';
import Fragment from '../fragment';
import renderCss from './css';
import renderHtml from './html';

function createHtmlElConfig(tagName, attrs = null, children = []) {
    return { tagName, attrs, children };
}

export default (parentJsxEl, options) => {
    const passedComponents = [];
    const cssList = [];

    function renderJsxEl(node) {
        if (node && node.type) {
            if (node.type === Fragment) {
                return node.props.children.map(renderJsxEl);

            } else if (typeof node.type === 'function') {
                // Component
                const fn = node.type;
                const renderedNode = fn(node.props, options);

                if ('css' in fn && !passedComponents.includes(fn)) {
                    passedComponents.push(fn);
                    cssList.push(typeof fn.css === 'function' ? fn.css(options) : fn.css);
                }

                return renderJsxEl(renderedNode);
            }
        }

        if (node === null || node === undefined) {
            return '';
        }

        if (typeof node === 'string' || typeof node === 'number') {
            return String(node);
        }

        const { children, ...attrs } = node.props;
        const renderedChildren = children.reduce((acc, child) => acc.concat(renderJsxEl(child)), []);

        return createHtmlElConfig(node.type, attrs, renderedChildren);
    }

    const content = renderJsxEl(parentJsxEl);

    return renderHtml(
        createHtmlElConfig('html', {
            'xmlns':    'http://www.w3.org/1999/xhtml',
            'xmlns:v':  'urn:schemas-microsoft-com:vml',
            'xmlns:o':  'urn:schemas-microsoft-com:office:office'
        }, [
            createHtmlElConfig('head', null, [
                createHtmlElConfig('meta', { charset: 'utf-8' }),
                createHtmlElConfig('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }),
                createHtmlElConfig('meta', { name: 'viewport', content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0;' }),
                createHtmlElConfig('style', { type: 'text/css' }, [
                    renderCss(cssList)
                ])
            ]),
            content
        ])
    );
};