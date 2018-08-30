import { createElement } from 'eml-core';
import elementTypes from '../props/element-types';
import * as borderRadiusParser from '../props/border-radius';
import textPropsToStyles from '../props/props-to-styles/text';
import borderPropsToStyles from '../props/props-to-styles/border';
import backgroundPropsToStyles from '../props/props-to-styles/background';

const Text = props => {
	const {
		children
	} = props;

	const parsedProps = {
		borderRadius: borderRadiusParser.parse(props)
	};

	const styles = {
		...textPropsToStyles(props),
		...borderPropsToStyles(props),
		...backgroundPropsToStyles(props),
		borderRadius: parsedProps.borderRadius ? borderRadiusParser.stringify(parsedProps.borderRadius) : null
	};

	return (
		<span style={styles}>
			{ children }
		</span>
	);
};

Text.propTypes = {
	...elementTypes
};

export default Text;
