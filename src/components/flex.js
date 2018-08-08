import classNames from 'classnames';
import { createElement, isElement, Component, Fragment } from 'eml-core';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
import propTypes from 'prop-types';
import { parse as parseDimensionBox, stringify as stringifyDimensionBox } from '../converters/dimension-box';

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
		gap: number
	};

	static css = {
		'.flex_row .flex__body': {
			display: 'table'
		},
		'.flex_row .flex__item, .flex_row .flex__gap': {
			display: 'table-cell'
		},
		'.flex_column .flex__item__body': {
			display: 'inline-block'
		}
	};

	constructor(props) {
		super(props);

		this.converted = {
			padding: parseDimensionBox(props.padding)
		};
	}

	render() {
		const {
			direction,
			background,
			color
		} = this.props;

		return (
			<Fragment>
				{ msoOpen }
				<table bgcolor={background} width="100%">
					<tr>
						<td style={{
							msoPaddingAlt: this.converted.padding ? stringifyDimensionBox(this.converted.padding) : null
						}}>
							{ msoClose }
							{ notMsoOpen }
							<div
								className={classNames('flex', `flex_${direction}`)}
								style={{
									color,
									background,
									padding: this.converted.padding ? stringifyDimensionBox(this.converted.padding) : null
								}}
							>
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
			</Fragment>
		);
	}

	renderBody() {
		const { direction } = this.props;

		return direction === 'row' ? this.renderRowBody() : this.renderColumnBody();
	};

	// Column

	renderColumnBody() {
		const { gap, children } = this.props;

		return children.map((child, i) => (
			<Fragment>
				{ gap > 0 && i > 0 ? this.renderColumnGap() : null }
				{ this.renderColumnFlexItem(child) }
			</Fragment>
		));
	};

	renderColumnGap() {
		const { gap } = this.props;

		return (
			<Fragment>
				{ msoOpen }
				<table {...ieTableProps}>
					<tr>
						<td height={gap}>
							{ msoClose }
							{ notMsoOpen }
							<div className="flex__gap" style={{ height: gap }} />
							{ notMsoClose }
							{ msoOpen }
						</td>
					</tr>
				</table>
				{ msoClose }
			</Fragment>
		);
	}

	renderColumnFlexItem(child) {
		const { alignItems, color } = this.props;

		let content = null;
		let alignSelf = null;

		if (isElement(child)) {
			const props = child.props;

			alignSelf = props.flexAlignSelf || alignItems;
			content = {
				...child,
				props: {
					...props,
					width: alignSelf === 'stretch' ? '100%' : props.width,
					flex: null,
					flexAlignSelf: null
				}
			};
		} else {
			alignSelf = alignItems;
			content = child;
		}

		return (
			<Fragment>
				{ msoOpen }
				<div align={alignToHorizontal[alignSelf]} style={{ color }}>
					{ msoClose }
					{ notMsoOpen }
					<div className="flex__item" style={{ textAlign: alignToHorizontal[alignSelf] }}>
						<div
							className="flex__item__body"
							style={{
								width: alignSelf === 'stretch' ? '100%' : null
							}}>
							{ notMsoClose }
							{ content }
							{ notMsoOpen }
						</div>
					</div>
					{ notMsoClose }
					{ msoOpen }
				</div>
				{ msoClose }
			</Fragment>
		);
	}

	// Row

	renderRowBody() {
		const { justifyContent, gap, children } = this.props;

		const childrenFlexes = children.reduce((acc, child) => {
			if (isElement(child)) {
				const flex = child.props.flex || 0;
				return flex > 0 ? acc + flex : acc;
			} else {
				return acc;
			}
		}, 0);

		const align = alignToHorizontal[justifyContent];
		const width = childrenFlexes > 0 || justifyContent === 'stretch' ? '100%' : null;

		return (
			<Fragment>
				{ msoOpen }
				<div align={align}>
					<table {...ieTableProps} width={width}>
						<tr>
							{ msoClose }
							{ notMsoOpen }
							<div
								className="flex__body"
								style={{ width }}
							>
								{ notMsoClose }
								{ children.map((child, i) => (
									<Fragment>
										{ gap > 0 && i > 0 ? this.renderRowGap() : null }
										{ this.renderRowFlexItem(child, childrenFlexes) }
									</Fragment>
								)) }
								{ notMsoOpen }
							</div>
							{ notMsoClose }
							{ msoOpen }
						</tr>
					</table>
				</div>
				{ msoClose }
			</Fragment>
		);
	}

	renderRowGap() {
		const { gap } = this.props;

		return (
			<Fragment>
				{ msoOpen }
				<td>
					<table {...ieTableProps} width={gap}>
						<tr>
							<td>
								{ msoClose }
								{ notMsoOpen }
								<div className="flex__gap">
									<div className="flex__gap__body" style={{ width: gap }} />
								</div>
								{ notMsoClose }
								{ msoOpen }
							</td>
						</tr>
					</table>
				</td>
				{ msoClose }
			</Fragment>
		);
	}

	renderRowFlexItem(child, childrenFlexes) {
		const { alignItems, color } = this.props;

		let width = null;
		let bgColor = null;
		let alignSelf = null;
		let content = null;

		if (isElement(child)) {
			const props = child.props;

			width = props.flex ? (props.flex / childrenFlexes * 100).toFixed() + '%' : null;
			alignSelf = props.flexAlignSelf || alignItems;
			bgColor = props.background && alignSelf === 'stretch' ? props.background : null;
			content = {
				...child,
				props: {
					...props,
					width: props.flex ? '100%' : props.width,
					flex: null,
					flexAlignSelf: null
				}
			};
		} else {
			alignSelf = alignItems;
			content = child;
		}

		return (
			<Fragment>
				{ msoOpen }
				<td
					width={width}
					bgcolor={bgColor}
					color={color}
					valign={alignToVertical[alignSelf]}
				>
					{ msoClose }
					{ notMsoOpen }
					<div
						className="flex__item"
						style={{
							width,
							verticalAlign: alignToVertical[alignSelf],
							backgroundColor: bgColor
						}}
					>
						{ notMsoClose }
						{ content }
						{ notMsoOpen }
					</div>
					{ notMsoClose }
					{ msoOpen }
				</td>
				{ msoClose }
			</Fragment>
		);
	}
}
