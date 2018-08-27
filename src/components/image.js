import { createElement } from 'eml-core';
import propTypes from 'prop-types';
import elementTypes from '../props/element-types';
import * as lengthParser from '../props/parsers/length';

const { number, string } = propTypes;

const Image = props => {
	const {
		src,
		width,
		height,
		alt
	} = props;

	const parsedProps = {
		width: width ? lengthParser.parse(width, ['px', '%']) : null,
		height: height ? lengthParser.parse(height, ['px', '%']) : null,
	};

	return (
		<img
			src={src}
			width={parsedProps.width ? lengthParser.stringifyHtmlAttr(parsedProps.width) : null}
			height={parsedProps.height ? lengthParser.stringifyHtmlAttr(parsedProps.height) : null}
			alt={alt}
			style={{ verticalAlign: 'top' }}
		/>
	);
};

Image.propTypes = {
	...elementTypes,
	src: string,
	alt: string,
};

export default Image;