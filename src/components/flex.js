import { createElement, isElement, Component, Fragment } from 'eml-core';
import propTypes from 'prop-types';
import elementTypes from '../props/element-types';
import msoTableProps from './helpers/mso-table-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
import Block from './block';

const { number, oneOf } = propTypes;

const alignToHorizontal = {
	'start': 	'left',
	'center': 	'center',
	'end': 		'right',
	'stretch': 	'left'
};

const alignToVertical = {
	'start': 	'top',
	'center': 	'middle',
	'end': 		'bottom',
	'stretch': 	'top'
};

export default class Flex extends Component {
	static defaultProps = {
		direction: 'row',
		justifyContent: 'start',
		alignItems: 'stretch',
		gap: 0,
	};

	static propTypes = {
		...elementTypes,
		direction: oneOf(['row', 'column']),
		justifyContent: oneOf(['start', 'center', 'end', 'stretch']),
		alignItems: oneOf(['start', 'center', 'end', 'stretch']),
		gap: number,
	};

	constructor(props) {
		super(props);

		this.childrenFlexes = props.children.reduce((acc, child) => (
			isElement(child) && child.props.flex
				? acc + child.props.flex
				: acc
		), 0);
	}

	render() {
		const { direction, justifyContent } = this.props;

		return (
			<Block {...this.props}>
				{ notMsoOpen }
				<div style={
					direction === 'row' ? {
						textAlign: alignToHorizontal[justifyContent]
					} : null
				}>
					<div style={
						direction === 'row' ? {
							display: 'inline-table',
							verticalAlign: 'top',
							textAlign: 'left',
							width: this.childrenFlexes > 0 || justifyContent === 'stretch' ? '100%' : null
						} : null
					}>
					{ notMsoClose }
					{ direction === 'row'
						? this.renderMsoRowWrapper(this.renderItems())
						: this.renderItems()
					}
					{ notMsoOpen }
					</div>
				</div>
				{ notMsoClose }
			</Block>
		);
	}

	renderMsoRowWrapper(body) {
		const { justifyContent } = this.props;

		const width = this.childrenFlexes > 0 || justifyContent === 'stretch' ? '100%' : null;

		// ! Outlook устанавливает для table text-align: left

		return (
			<Fragment>
				{ msoOpen }
				<table {...msoTableProps} width="100%">
					<tr>
						<td align={alignToHorizontal[justifyContent]}>
							<table {...msoTableProps} width={width} style={{ textAlign: 'left' }}>
								<tr>
									{ msoClose }
									{ body }
									{ msoOpen }
								</tr>
							</table>
						</td>
					</tr>
				</table>
				{ msoClose }
			</Fragment>
		);
	}

	renderItems() {
		const { children, gap } = this.props;

		return children.map((child, i) => (
			<Fragment>
				{ gap > 0 && i > 0 ? this.renderGap() : null }
				{ this.renderItem(child) }
			</Fragment>
		));
	}

	renderGap() {
		const { gap, direction } = this.props;

		return (
			<Fragment>
				{ msoOpen }
				{ direction === 'row' ? this.renderMsoRowGap() : this.renderMsoColumnGap() }
				{ msoClose }
				{ notMsoOpen }
				<div style={direction === 'row' ? { display: 'table-cell' } : null}>
					<div style={direction === 'row' ? { width: gap } : { height: gap }} />
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

	renderItem(child) {
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
				<div style={
					direction === 'row'
						? {
							display: 'table-cell',
							width: rowChildWidth,
							verticalAlign: alignToVertical[alignSelf]
						}
						: {
							textAlign: alignToHorizontal[alignSelf]
						}
				}>
					<div style={
						direction === 'column' ? {
							display: 'inline-block',
							// verticalAlign: alignToVertical[alignSelf],
							width: alignSelf === 'stretch' ? '100%' : child.props.width,
							textAlign: 'left'
						} : null
					}>
						{ notMsoClose }
						{ content }
						{ notMsoOpen }
					</div>
				</div>
				{ notMsoClose }
			</Fragment>
		);

		return direction === 'row'
			? this.constructor.renderMsoRowFlexItemWrapper(flexItem, { child, alignSelf, rowChildWidth })
			: this.constructor.renderMsoColumnFlexItemWrapper(flexItem, { alignSelf });
	}

	static renderMsoRowFlexItemWrapper(flexItem, { child, alignSelf, rowChildWidth }) {
		const bgColor = isElement(child) && child.props.background && alignSelf === 'stretch'
			? child.props.background
			: null;

		return (
			<Fragment>
				{ msoOpen }
				<td
					width={rowChildWidth}
					bgcolor={bgColor}
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

	static renderMsoColumnFlexItemWrapper(flexItem, { alignSelf }) {
		return (
			<Fragment>
				{ msoOpen }
				<table {...msoTableProps} width="100%">
					<tr>
						<td align={alignToHorizontal[alignSelf]}>
							<table {...msoTableProps} width={alignSelf === 'stretch' ? '100%' : null} style={{ textAlign: 'left' }}>
								<tr>
									<td>
										{ msoClose }
										{ flexItem }
										{ msoOpen }
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				{ msoClose }
			</Fragment>
		);
	}

}
