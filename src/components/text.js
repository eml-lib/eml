import { createElement } from 'eml-core';
import { element } from '../prop-types';

const Text = props => {
	const {
		children
	} = props;

	return (
		<span>{ children }</span>
	);
};

Text.propTypes = {
	...element
};

export default Text;