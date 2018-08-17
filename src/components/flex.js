import { createElement, isElement, Component, Fragment } from 'eml-core';
import propTypes from 'prop-types';
import color from '../prop-types/color';
import * as dimensionBoxParser from '../parsers/dimension-box';
import { tableAsBlock as msoTableProps } from './helpers/mso-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
import Block from './block';

const { number, oneOf } = propTypes;

const alignToHorizontal = {
	'start': 'left',
	'center': 'center',
	'end': 'right',
	'stretch': 'left'
};

const alignToVertical = {
	'start': 'top',
	'center': 'middle',
	'end': 'bottom',
	'stretch': 'top'
};

export default class Flex extends Component {
	static defaultProps = {
		direction: 'row',
		justifyContent: 'start',
		alignItems: 'stretch',
		gap: 0,
		padding: 0
	};

	static propTypes = {
		direction: oneOf(['row', 'column']),
		justifyContent: oneOf(['start', 'center', 'end', 'stretch']),
		alignItems: oneOf(['start', 'center', 'end', 'stretch']),
		gap: number,

		color: color,
		backgroundColor: color
	};

	constructor(props) {
		super(props);

		this.parsedProps = {
			padding: dimensionBoxParser.parse(props.padding)
		};

		this.childrenFlexes = props.children.reduce((acc, child) => (
			isElement(child) && child.props.flex
				? acc + child.props.flex
				: acc
		), 0);
	}

	render() {
		const { direction, justifyContent, padding } = this.props;

		return (
			<Block
				padding={padding}
			>
				{ msoOpen }
				<table width="100%">
					<tr>
						<td>
							{ msoClose }
							{ notMsoOpen }
							<div style={{
								...(direction === 'row' ? {
									textAlign: alignToHorizontal[justifyContent]
								} : null)
							}}>
								{ notMsoClose }
								{ this.renderBody() }
								{ notMsoOpen }
							</div>
							{ notMsoClose }
							{ msoOpen }
						</td>
					</tr>
				</table>
				{ msoClose }
			</Block>
		);
	}

	renderBody() {
		const { children, gap, direction } = this.props;

		const body = children.map((child, i) => (
			<Fragment>
				{ gap > 0 && i > 0 ? this.renderGap() : null }
				{ this.renderFlexItem(child) }
			</Fragment>
		));

		return direction === 'row' ?
			this.renderMsoRowBodyWrapper(body) :
			body;
	}

	renderGap() {
		const { gap, direction } = this.props;

		return (
			<Fragment>
				{ msoOpen }
				{ direction === 'row' ? this.renderMsoRowGap() : this.renderMsoColumnGap() }
				{ msoClose }
				{ notMsoOpen }
				<div style={{ ...(direction === 'row' ? { display: 'table-cell' } : null) }}>
					<div style={{ ...(direction === 'row' ? { width: gap } : { height: gap }) }} />
				</div>
				{ notMsoClose }
			</Fragment>
		);
	}

	renderMsoRowGap() {
		const { gap } = this.props;

		return (
			<td>
				<table {...msoTableProps} width={gap}>
					<tr>
						<td />
					</tr>
				</table>
			</td>
		);
	}

	renderMsoColumnGap() {
		const { gap } = this.props;

		return (
			<table {...msoTableProps}>
				<tr>
					<td height={gap} style={{ fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
				</tr>
			</table>
		);
	}

	renderMsoRowBodyWrapper(body) {
		const { direction, justifyContent } = this.props;

		const align = alignToHorizontal[justifyContent];
		const width = this.childrenFlexes > 0 || justifyContent === 'stretch' ? '100%' : null;

		return (
			<Fragment>
				{ msoOpen }
				<table {...msoTableProps} width={width} align={align}>
					<tr>
						{ msoClose }
						{ notMsoOpen }
						<div style={{
							...(direction === 'row' ? {
								display: 'inline-table',
								verticalAlign: 'top',
								textAlign: 'left',
								width
							} : null)
						}}>
							{ notMsoClose }
							{ body }
							{ notMsoOpen }
						</div>
						{ notMsoClose }
						{ msoOpen }
					</tr>
				</table>
				{ msoClose }
			</Fragment>
		);
	}

	renderFlexItem(child) {
		const { direction, alignItems } = this.props;

		let rowChildWidth = null;
		let alignSelf = alignItems;
		let content = child;

		if (isElement(child)) {
			rowChildWidth = child.props.flex ? (child.props.flex / this.childrenFlexes * 100).toFixed() + '%' : null;
			alignSelf = child.props.flexAlignSelf || alignItems;
			content = {
				...child,
				props: {
					...child.props,
					width: (
						direction === 'row'
							? child.props.flex ? '100%' : child.props.width
							: alignSelf === 'stretch' ? '100%' : child.props.width
					),
					flex: null,
					flexAlignSelf: null
				}
			};
		}

		const flexItem = (
			<Fragment>
				{ notMsoOpen }
				<div style={{
					...(direction === 'row'
						? {
							display: 'table-cell',
							width: rowChildWidth,
							verticalAlign: alignToVertical[alignSelf],
						}
						: {
							textAlign: alignToHorizontal[alignSelf]
						}
					)
				}}>
					<div style={{
						...(direction === 'column' ? {
							display: 'inline-block',
							verticalAlign: alignToVertical[alignSelf],
							width: alignSelf === 'stretch' ? '100%' : child.props.width,
							textAlign: 'left'
						} : null)
					}}>
						{ notMsoClose }
						{ content }
						{ notMsoOpen }
					</div>
				</div>
				{ notMsoClose }
			</Fragment>
		);

		return direction === 'row'
			? this.renderMsoRowFlexItemWrapper(flexItem, { child, alignSelf, rowChildWidth })
			: this.renderMsoColumnFlexItemWrapper(flexItem, { alignSelf });
	}

	renderMsoRowFlexItemWrapper(flexItem, { child, alignSelf, rowChildWidth }) {
		const { color } = this.props;

		const bgColor = isElement(child) && child.props.background && alignSelf === 'stretch'
			? child.props.background
			: null;

		return (
			<Fragment>
				{ msoOpen }
				<td
					width={rowChildWidth}
					bgcolor={bgColor}
					color={color}
					valign={alignToVertical[alignSelf]}
				>
					{ msoClose }
					{ flexItem }
					{ msoOpen }
				</td>
				{ msoClose }
			</Fragment>
		);
	}

	renderMsoColumnFlexItemWrapper(flexItem, { alignSelf }) {
		const { color } = this.props;

		return (
			<Fragment>
				{ msoOpen }
				<div align={alignToHorizontal[alignSelf]} style={{ color }}>
					{ msoClose }
					{ flexItem }
					{ msoOpen }
				</div>
				{ msoClose }
			</Fragment>
		);
	}

}
