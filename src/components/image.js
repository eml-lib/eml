import { createElement } from 'eml-core';
import propTypes from 'prop-types';
import { parse as parseLength, stringifyHtmlAttr as stringifyHtmlAttrLength } from '../converters/length';

const { number, string } = propTypes;

const Image = props => {
	const {
		src,
		width,
		height,
		border,
		alt
	} = props;

	const convertedProps = {
		width: width ? parseLength(width, ['px', '%']) : null,
		height: height ? parseLength(height, ['px', '%']) : null,
	};

	return (
		<img
			src={src}
			width={convertedProps.width ? stringifyHtmlAttrLength(convertedProps.width) : null}
			height={convertedProps.height ? stringifyHtmlAttrLength(convertedProps.height) : null}
			alt={alt}
			style={{ verticalAlign: 'top' }}
		/>
	);
};

Image.propTypes = {
	src: string,
	alt: string
};

export default Image;