import core from 'eml-core';
const { createElement, Fragment } = core;
import types from '../types';
import BlockWrapper from './helpers/block-wrapper';

// import propConvertFns from '../prop-convert-fns';
// import composePropConvertFns from '../prop-convert-fns/helpers/compose';

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
		? (
			<td>
				<table cellPadding="0" cellSpacing="0" width={gap}>
					<tr>
						<td />
					</tr>
				</table>
			</td>
		)
		: (
			<table cellPadding="0" cellSpacing="0">
				<tr>
					<td height={gap} />
				</tr>
			</table>
		);
}

const Flex = props => {
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
	} = props;

	const childrenFlexes = children.reduce(
        (acc, { props: { flex } }) => flex ? acc + flex : acc,
        0
    );

	const childNodes = children.map((child, i) => (
		<Fragment>
			{ gap && gap > 0 && i > 0 ? renderGap({ gap, direction }) : null }
			{ renderFlexItem({ child, alignItems, childrenFlexes, direction }) }
		</Fragment>
	));

	return direction === 'row'
		? (
			<BlockWrapper padding={padding} fullWidth={true} background={background} color={color}>
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
			<BlockWrapper padding={padding} fullWidth={true} background={background} color={color}>
				{ childNodes }
			</BlockWrapper>
		);
};

Flex.css = {

};

export default Flex;
