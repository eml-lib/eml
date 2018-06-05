import deleteProperties from '../helpers/object-delete-properties';
import { parse as parseColor } from '../parsers/color';

export const convert = props => {
	const {
		background,
		backgroundColor,
		backgroundImage,
		// backgroundPosition,
		// backgroundRepeat,

		...restProps
	} = props;

	const newProps = {
		...restProps,
		background: (background || backgroundColor || backgroundImage)
			? {
				color: backgroundColor ? parseColor(backgroundColor) : null,
				image: backgroundImage,
			}
			: null
	};

	return deleteProperties(newProps, [
		'backgroundColor',
		'backgroundImage',
	]);
};