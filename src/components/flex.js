const { createElement, Fragment } = require('../eml-core/build.js');

// import { createElement, Fragment } from 'eml-core';
import propParsers from './block-props';
import parsers from '../parsers';
// import FlexItem from './flex-item';
import BlockWrapper from './helpers/block-wrapper';
import propConverters from '../prop-converters';
import composePropConverters from '../prop-converters/helpers/compose';

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

function renderFlexItem({ child, parentAlign, parentPack, childrenFlexes, flowDirection }) {
	const Child = child.type;

	// console.log('child.props', child.props);

	return (
		<Child
			{...child.props}
			flexAmount={childrenFlexes}
			parentPack={parentPack}
			parentAlign={parentAlign}
			flowDirection={flowDirection}
		>
			{ child.props.children }
		</Child>
	);
}

function renderGap({ gap, flowDirection }) {
	return flowDirection === 'row'
		? gap.unit === '%'
			? (
				<td width={gap.value + '%'} />
			)
			: (
				<td>
					<table cellPadding={0} cellSpacing={0} width={gap.value}>
						<tr>
							<td />
						</tr>
					</table>
				</td>
			)
		: (
			<table cellPadding={0} cellSpacing={0}>
				<tr>
					<td height={gap.value} />
				</tr>
			</table>
		);
}

export default props => {
	const {
		width,
		height,
		padding,
		margin,
		border,
		borderRadius,
		background,
		color,

		gap,
		align,
		pack,
		flowDirection,

		children
	} = composePropConverters(props, [
		propConverters.margin,
		propConverters.padding,
		propConverters.border,
		propConverters.background,
		propConverters.text
	]);

	const parsedGap = gap ? parsers.dimension.parse(gap) : null;

	const childrenFlexes = children.reduce(
        (acc, { props: { flex } }) => flex ? acc + parsers.number.parse(flex) : acc,
        0
    );

	const childNodes = children.map((child, i) => (
		<Fragment>
			{ parsedGap && parsedGap.value > 0 && i > 0 ? renderGap({ gap: parsedGap, flowDirection }) : null }
			{ renderFlexItem({ child, align, pack, childrenFlexes, flowDirection }) }
		</Fragment>
	));

	return flowDirection === 'row'
		? (
			<BlockWrapper
				padding={padding}
				fullWidth={true}
				background={background}
				color={color}
				border={border}
			>
				<div align={ pack ? packToAlign[pack] : 'left' }>
					<table cellPadding="0" cellSpacing="0" border="0" width={ childrenFlexes > 0 || pack === 'stretch' ? '100%' : null }>
						<tr>
							{ childNodes }
						</tr>
					</table>
				</div>
			</BlockWrapper>
		)
		: (
			<div>
				{ childNodes }
			</div>
		);
}
