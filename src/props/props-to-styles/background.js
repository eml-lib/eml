import { convert as parseColor } from '../parsers/color';

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
		backgroundImage: backgroundImage ? `url(${encodeURI(backgroundImage)})` : null,
		backgroundPosition,
		backgroundRepeat: backgroundImage ? (backgroundRepeat ? backgroundRepeat : 'no-repeat') : null
	};
};