import compose from '../parsers/compose';
import convertText from '../parsers/text';
import convertBorder from '../parsers/border';
import convertBackground from '../parsers/background';
import convertPadding from '../parsers/padding';
import convertMargin from '../parsers/margin';

export default props => {
	return compose(props, [
		convertText,
		convertBackground,
		convertBorder,
		convertPadding,
		convertMargin
	]);
};
