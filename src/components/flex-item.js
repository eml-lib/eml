import { createElement } from 'eml-core';
import propConverters from '../prop-converters';
import composePropConverters from '../prop-converters/helpers/compose';
import BlockWrapper from './helpers/block-wrapper';
import parsers from '../parsers';

const alignToHorizontal = {
	'start': 'left',
	'center': 'center',
	'end': 'right',
	'stretch': 'left'
};

const alignToVertical = {
	'start': 'top',
	'center': 'middle',
	'end': 'bottom'
};

const renderRowFlexItem = () => {

};

const renderColumnFlexItem = () => {

};

export default props => {
	const {
		// width,
		flex,
		alignSelf,
		padding,
		background,

		// from parent
		direction,
		flexAmount,

		children
	} = composePropConverters(props, [
		propConverters.padding,
		propConverters.background,
	]);

	return direction === 'row'
		? (
			<td
				width={flex ? (parsers.number.parse(flex) / flexAmount * 100).toFixed() + '%' : null}
				bgcolor={background && alignSelf === 'stretch' ? parsers.color.stringify(background.color) : null}
				valign={alignToVertical[alignSelf]}
			>
				<BlockWrapper
					padding={padding ? parsers.dimensionBox.parse(padding) : null}
					background={alignSelf !== 'stretch' ? background : null}
					fullWidth={true}
				>
					{ children }
				</BlockWrapper>
			</td>
		)
		: (
			<div align={alignToHorizontal[alignSelf]}>
				<BlockWrapper
					padding={padding ? parsers.dimensionBox.parse(padding) : null}
					background={background}
					fullWidth={alignSelf === 'stretch'}
				>
					{ children }
				</BlockWrapper>
			</div>
		);
}