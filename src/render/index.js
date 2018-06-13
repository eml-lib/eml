// import warning from 'warning';
import flatten from '../helpers/array-flatten';
import Fragment from '../fragment';
import renderCss from './css';
import renderHtml from './html';

function createNode(tagName, attrs = null, children = []) {
    return { tagName, attrs, children };
}

export default (parentJsxEl, options) => {
    // const passedComponents = [];
    // const cssList = [];

    function renderJsx(node) {
		if (node === null || node === undefined) {
			return '';
		}

		if (typeof node === 'string' || typeof node === 'number') {
			return String(node);
		}

		if (node.type === Fragment) {
			return node.props.children.map(renderJsx);
		}

		// Component
		if (typeof node.type === 'function') {
			const fn = node.type;
			const renderedNode = fn(node.props, options);

			// if ('css' in fn && !passedComponents.includes(fn)) {
			//     passedComponents.push(fn);
			//     cssList.push(typeof fn.css === 'function' ? fn.css(options) : fn.css);
			// }

			return renderJsx(renderedNode);
		}

        const { children, ...attrs } = node.props;
        const renderedChildren = children.reduce((acc, child) => {
        	const renderedChild = renderJsx(child);

			return Array.isArray(renderedChild)
				? [...acc, ...flatten(renderedChild, Infinity)]
				: [...acc, renderedChild]
		}, []);

        return createNode(node.type, attrs, renderedChildren);
    }

	const content = renderJsx(parentJsxEl);

	return renderHtml(
		createNode('html', {
			'xmlns':    'http://www.w3.org/1999/xhtml',
			'xmlns:v':  'urn:schemas-microsoft-com:vml',
			'xmlns:o':  'urn:schemas-microsoft-com:office:office'
		}, [
			createNode('head', null, [
				createNode('meta', { charset: 'utf-8' }),
				createNode('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }),
				createNode('meta', { name: 'viewport', content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0;' }),
				createNode('style', { type: 'text/css' }, [
					// renderCss(cssList)
				])
			]),
			content
		])
	);
};