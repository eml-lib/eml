import { createElement, Fragment, Component } from 'eml-core';
import arrayPartition from '../helpers/array-partition';
import insertBetween from '../helpers/array-insert-between';
import arrayFromCount from '../helpers/array-from-count';
import msoTableProps from './helpers/mso-table-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

export default class AutoGrid extends Component {
	static defaultProps = {
		gap: 0
	};

	static css = {
		'.auto-grid': {
			display: 'flex'
		},
		'.auto-grid__empty-item': {
			flexGrow: 1
		}
	};

	render() {
		const { children } = this.props;

		// const size = this.props.size ? parseMediaQueryAttr(this.props.size).value : 0;

		// Разбиенеие детей на столбцы и строки
		const partitions = children.reduce((acc, item) => {
			const span = Math.min(item.props.span || 1, size);
			const prevRow = acc.length > 0 && acc[acc.length - 1];

			if (prevRow) {
				const prevRowSpansAmount = prevRow.reduce((acc, column) => acc + (column.props.span || 1), 0);
				if (prevRowSpansAmount + span <= size) {
					prevRow.push(item);
					return acc;
				} else {
					const row = [item];
					return [...acc, row];
				}
			} else {
				const row = [item];
				return [...acc, row];
			}
		}, []);

		const childNodes = this.renderRows({ rows: partitions });

		return (
			<table {...msoTableProps} width="100%">
				<div>
					{ childNodes }
				</div>
			</table>
		);
	}

	renderRows({ rows }) {
		const { gap } = this.props;

		const renderedRows = rows.map(columns => (
			<Fragment>
				{ msoOpen }
				<tr>
					{ msoClose }
					{ this.renderColumns(columns) }
					{ msoOpen }
				</tr>
				{ msoClose }
			</Fragment>
		));

		return gap
			? insertBetween(renderedRows, this.renderRowGap())
			: renderedRows;
	}

	renderColumns(columns) {
		const { gap } = this.props;
		// const size = this.props.size ? parseMediaQueryAttr(this.props.size).value : 0;

		const columnSpansAmount = columns.reduce((acc, column) => acc + (column.props.span || 1), 0);

		const renderedColumns = columns.map((column, i) => this.constructor.renderColumn({
			column,
			width: 100 * (column.props.span || 1) / size + '%',
			gapLeft: i === 0 ? 0 : gap / 2,
			gapRight: i === size - 1 ? 0 : gap / 2
		}));

		return size - columnSpansAmount > 0
			? [
				...renderedColumns,
				this.constructor.renderEmptyColumn({
					span: size - columnSpansAmount,
					width: 100 * (size - columnSpansAmount) / size + '%'
				})
			]
			: renderedColumns;
	}

	static renderEmptyColumn({ span = 1, width }) {
		return (
			<td colSpan={span > 1 ? span : null} width={width} />
		);
	}

	static renderColumn({ column, width, gapLeft, gapRight }) {
		const {
			type: Item,
			props: { children, ...attrs }
		} = column;

		return (
			<Item {...attrs} _width={width} _gapLeft={gapLeft} _gapRight={gapRight}>
				{ children }
			</Item>
		);
	}

	renderRowGap() {
		const { gap } = this.props;
		// const size = this.props.size ? parseMediaQueryAttr(this.props.size).value : 0;

		return (
			<tr>
				<td height={gap} colSpan={size} />
			</tr>
		);
	}
}