const { createElement, Fragment } = require('../eml-core/build.js');

const Block = props => {
	const {
		children,
		padding
	} = props;

	return (
		<div>
			{ children }
		</div>
	);
};

export default Block;