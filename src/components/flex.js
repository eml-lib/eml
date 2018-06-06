import { createElement, Fragment } from 'eml-core';
import parsers from '../parsers';
import BlockWrapper from './helpers/block-wrapper';
import propConverters from '../prop-converters';
import composePropConverters from '../prop-converters/helpers/compose';

const packToAlign = {
	'start': 'left',
	'center': 'center',
	'end': 'right'
};

function renderFlexItem({ child, align, childrenFlexes, direction }) {
	const { type: Child, props } = child;

	return (
		<Child
			{...props}
			alignSelf={props.alignSelf || align}
			direction={direction}
			flexAmount={childrenFlexes}
		>
			{ props.children }
		</Child>
	);
}

function renderGap({ gap, direction }) {
	return direction === 'row'
		? /*gap.unit === '%'
			? (
				<td width={gap.value + '%'} />
			)
			:*/ (
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
		direction,
		align,
		pack,
		gap,
		// width,
		padding,
		// margin,
		background,
		color,

		children
	} = composePropConverters(props, [
		propConverters.margin,
		propConverters.padding,
		propConverters.background
	]);

	const parsedGap = gap ? parsers.dimension.parse(gap) : null;

	const childrenFlexes = children.reduce(
        (acc, { props: { flex } }) => flex ? acc + parsers.number.parse(flex) : acc,
        0
    );

	const childNodes = children.map((child, i) => (
		<Fragment>
			{ parsedGap && parsedGap.value > 0 && i > 0 ? renderGap({ gap: parsedGap, direction }) : null }
			{ renderFlexItem({ child, align, childrenFlexes, direction }) }
		</Fragment>
	));

	return direction === 'row'
		? (
			<BlockWrapper
				padding={padding}
				fullWidth={true}
				background={background}
				color={color}
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
			<BlockWrapper
				padding={padding}
				fullWidth={true}
				background={background}
				color={color}
			>
				{ childNodes }
			</BlockWrapper>
		);
}
