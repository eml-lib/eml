import deleteProperties from '../helpers/object-delete-properties';
import { parse as parseColor } from '../parsers/color';

export const convert = props => {
	const {
		background,
		backgroundColor,
		...restProps
	} = props;

	const newProps = {
		...restProps,
		background: (background || backgroundColor)
			? {
				color: parseColor(background || backgroundColor)
			}
			: null
	};

	return deleteProperties(newProps, [
		'backgroundColor'
	]);
};