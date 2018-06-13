const createNode = (tagName, attrs = null, children = []) => ({
	tagName,
	attrs,
	children
});

export default function renderJsx(node) {
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