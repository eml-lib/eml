import { createElement } from 'eml-core';

const Text = props => {
	const {
		children
	} = props;

	return (
		<span>{ children }</span>
	);
};

Text.propTypes = {

};

export default Text;