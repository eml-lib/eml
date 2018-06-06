import { createElement, Fragment } from 'eml-core';
import types from '../types';
import BlockWrapper from './helpers/block-wrapper';
import propConvertFns from '../prop-convert-fns';
import composePropConvertFns from '../prop-convert-fns/helpers/compose';

const alignToHorizontal = {
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
		alignItems,
		justifyContent,
		gap,
		// width,
		padding,
		// margin,
		background,
		color,
		children
	} = composePropConvertFns(props, [
		propConvertFns.margin,
		propConvertFns.padding,
		propConvertFns.background
	]);

	const parsedGap = gap ? types.dimension.parse(gap) : null;

	const childrenFlexes = children.reduce(
        (acc, { props: { flex } }) => flex ? acc + types.number.parse(flex) : acc,
        0
    );

	const childNodes = children.map((child, i) => (
		<Fragment>
			{ parsedGap && parsedGap.value > 0 && i > 0 ? renderGap({ gap: parsedGap, direction }) : null }
			{ renderFlexItem({ child, alignItems, childrenFlexes, direction }) }
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
				<div align={ justifyContent ? alignToHorizontal[justifyContent] : 'left' }>
					<table cellPadding="0" cellSpacing="0" border="0" width={ childrenFlexes > 0 || justifyContent === 'stretch' ? '100%' : null }>
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
