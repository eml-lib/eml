const { createElement, Fragment } = require('../eml-core/build.js');
import BlockWrapper from './helpers/block-wrapper';

// import { createElement, Fragment } from 'eml-core';
import parsers from "../parsers";

const packToAlign = {
	'start': 'left',
	'center': 'center',
	'end': 'right'
};

const alignToVAlign = {
	'start': 'top',
	'center': 'middle',
	'end': 'bottom'
};

const renderContent = ({ padding, background, color, content }) => {
	return (
		<BlockWrapper
			padding={padding}
			// fullWidth={childrenFlexes > 0 || props.width}
			background={background}
			color={color}
		>
			{ content }
		</BlockWrapper>
	)
};

const renderRowFlexItem = () => {

};

const renderColumnFlexItem = () => {

};

export default props => {
	const {
		width,
		// height,
		flex,
		pack,
		align,
		packSelf,
		alignSelf,

		padding,

		color,
		border,
		backgroundColor,

		selfAlign,
		selfPack,
		parentPack,
		parentAlign,
		flowDirection,

		flexAmount,

		children
	} = props;

	const newProps = {
		width: flex ? (parsers.number.parse(flex) / flexAmount * 100).toFixed() + '%' : null,
		align: selfPack ? packToAlign[selfPack] : packToAlign[parentPack],
		vAlign: selfAlign ? alignToVAlign[selfAlign] : alignToVAlign[parentAlign]
	};

	const content = renderContent({
		content: children,
		padding: padding ? parsers.dimensionBox.parse(padding) : null
	});

	return flowDirection === 'row'
		? (
			<td {...newProps} bgcolor={backgroundColor} style={{ border }}>
				{ content }
			</td>
		)
		: (
			<div style={{ backgroundColor, border }}>
				{ content }
			</div>
		);
}