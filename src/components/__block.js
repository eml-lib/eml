const { createElement, Fragment } = require('../eml-core/build.js');
import IEBlockWrapper from './helpers/IEBlockWrapper';
import isElement from './helpers/is-element';
import parsers from '../parsers';

const packToAlign = {
	'start': 'left',
	'center': 'center',
	'end': 'right'
};

const alignToValign = {
	'start': 'top',
	'center': 'middle',
	'end': 'bottom'
};

const Block = props => {
	const {
		// self props
		width,
		height,
		padding,
		margin,
		border,
		borderRadius,
		background,
		color,

		// children props
		gap,
		flowDirection,
		pack,
		align,

		// context props
		flex,
		packSelf,
		alignSelf,

		children
	} = props;

	const childrenFlexes = children.reduce(
		(acc, child) => {
			const isBlock = isElement(child) && child.type && child.type.componentType === 'block-element';
			return isBlock ? acc + propParsers(child.props).flex : acc;
		},
		0
	);

	function createFlexItem(child, parentAlign, parentPack) {
		let width = null;
		let color = null;
		let align = packToAlign[parentPack];
		let valign = alignToValign[parentAlign];

		if (isElement(child)) {
			const props = propParsers(child.props);

			if ('flex' in props && props.flex > 0) {
				width = (props.flex / childrenFlexes * 100).toFixed() + '%';
			}

			if ('selfPack' in props) {
				align = packToAlign[props.selfPack];
			}

			if ('selfAlign' in props) {
				valign = alignToValign[props.selfAlign];
			}

			if ('color' in props) {
				color = parsers.color.stringify(props.color);
			}
		}

		const body = typeof child === 'object'
			? {
				...child,
				props: {
					...child.props,
					width: width ? '100%' : null
				}
			}
			: child;

		return (
			<td width={width} align={align} valign={valign}>
				{ body }
			</td>
		);
	}

	function createGap() {
		if (gap.unit === '%') {
			return <td width={parsers.dimension.stringify(gap)} />;
		} else {
			return (
				<td>
					<table cellPadding={0} cellSpacing={0} width={parsers.dimension.stringify(gap)}>
						<tr>
							<td/>
						</tr>
					</table>
				</td>
			);
		}
	}

	function createFlexItemWithGap(child, parentAlign, parentPack, i) {
		return (
			<Fragment>
				{ createFlexItem(child, parentAlign, parentPack) }
				{ i < children.length - 1 ? createGap() : null }
			</Fragment>
		);
	}

	const childNodes = gap
		? children.reduce((acc, child, i) => [...acc, createFlexItemWithGap(child, align, pack, i)], [])
		: children.map(child => createFlexItem(child, align, pack));
	
	let body;

	if (flowDirection === 'row') {
		body = (
			<IEBlockWrapper
				padding={padding}
				fullWidth={childrenFlexes > 0 || props.width}
				background={background}
				color={color}
				border={border}
			>
				<div align={ pack && pack in packToAlign ? packToAlign[pack] : 'left' }>
					<table
						cellPadding={0}
						cellSpacing={0}
						border={0}
						width={childrenFlexes > 0 ? '100%' : null}
						height={parsers.dimension.stringify(height)}
					>
						<tr>
							{ childNodes }
						</tr>
					</table>
				</div>
			</IEBlockWrapper>
		);
	} else {

		body = (
			<IEBlockWrapper
				padding={margin}
				fullWidth={childrenFlexes > 0 || props.width}
			>
				<IEBlockWrapper
					padding={padding}
					fullWidth={childrenFlexes > 0 || props.width}
					background={background}
					color={color}
				>
					{ children.map(child => {
						if (typeof child === 'object') {
							return {
								...child,
								props: {
									...child.props,
									width: props.align && props.align === 'stretch' ? '100%' : null
								}
							};
						} else {
							return child;
						}
					}) }
				</IEBlockWrapper>
			</IEBlockWrapper>
		);
	}

	return (
		<IEBlockWrapper
			padding={margin}
			fullWidth={childrenFlexes > 0 || props.width}
		>
			{ body }
		</IEBlockWrapper>
	);
};

Block.componentName = 'block';

export default Block;