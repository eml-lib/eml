import { parse as parseColor } from '../types/color';

export default props => {
	const {
		background,
		backgroundColor,
		...restProps
	} = props;

	return {
		background: (
			(background || backgroundColor) ? {
				color: parseColor(background || backgroundColor)
			} : null
		),
		...restProps
	};
};