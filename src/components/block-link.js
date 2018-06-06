import IEBlockWrapper from './helpers/IEBlockWrapper';
import { createElement } from 'eml-core';
import parsers from '../parsers';

export default props => {
	const {
		to,
		color,
		textDecoration,
		backgroundColor,
		padding,
		borderRadius,

		children,
	} = props;

	const styles = {
		color: color || null,
		textDecoration: textDecoration || null,
		backgroundColor: backgroundColor || null
	};

	return (
		<IEBlockWrapper
			padding={padding}
			// background={{ color: backgroundColor }}
			borderRadius={borderRadius}
		>
			<a href={to} style={styles}>
				{ children }
			</a>
		</IEBlockWrapper>
	);
}