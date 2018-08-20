import { convert as parseColor } from './color';

export default props => {
	const {
		// background,
		backgroundColor,
		backgroundImage,
		backgroundPosition,
		backgroundRepeat
	} = props;

	return {
		// background,
		backgroundColor,
		backgroundImage,
		backgroundPosition,
		backgroundRepeat
	};
};