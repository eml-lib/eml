import createElement from '../create-element';
// import propConvertFns from '../prop-convert-fns';
// import composePropConvertFns from '../prop-convert-fns/helpers/compose';
import BlockWrapper from './helpers/block-wrapper';
import types from '../types';

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
	} = props;

	return direction === 'row'
		? (
			<td
				width={flex ? (flex / flexAmount * 100).toFixed() + '%' : null}
				// bgcolor={background && alignSelf === 'stretch' ? types.color.stringify(background.color) : null}
				bgcolor={background && alignSelf === 'stretch' ? background.color : null}
				valign={alignToVertical[alignSelf]}
			>
				<BlockWrapper
					padding={padding}
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
					padding={padding}
					background={background}
					fullWidth={alignSelf === 'stretch'}
				>
					{ children }
				</BlockWrapper>
			</div>
		);
}