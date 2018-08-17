import { convert as parseColor } from './color';

export default props => {
	const {
		background,
		backgroundColor,
		backgroundImage,
		backgroundPosition,
		backgroundRepeat,
		...restProps
	} = props;

	return {
		background,
		...restProps
	};
};