import core from 'eml-core';
const { createElement, Fragment } = core;
import arrayPartition from '../helpers/array-partition';
import insertBetween from '../helpers/array-insert-between';
import arrayFromCount from '../helpers/array-from-count';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
import { parseMediaQueryAttr } from '../types';

const renderRowGap = ({ gap, size }) => (
	<tr>
		<td height={gap} colSpan={size} />
	</tr>
);

const renderColumn = ({ column, width, gapLeft, gapRight }) => {
	const {
		type: Item,
		props: { children, ...attrs }
	} = column;

	return (
		<Item {...attrs} _width={width} _gapLeft={gapLeft} _gapRight={gapRight}>
			{ children }
		</Item>
	);
};

const renderEmptyColumn = ({ span = 1, width }) => (
	<td colSpan={span > 1 ? span : null} width={width} />
);

const renderColumns = ({ columns, gap, size }) => {
	const columnSpansAmount = columns.reduce((acc, column) => acc + (column.props.span || 1), 0);

	const renderedColumns = columns.map((column, i) => renderColumn({
		column,
		width: 100 * (column.props.span || 1) / size + '%',
		gapLeft: i === 0 ? 0 : gap / 2,
		gapRight: i === size - 1 ? 0 : gap / 2
	}));

	return size - columnSpansAmount > 0
		? [
			...renderedColumns,
			renderEmptyColumn({
				span: size - columnSpansAmount,
				width: 100 * (size - columnSpansAmount) / size + '%'
			})
		]
		: renderedColumns;
};

const renderRows = ({ rows, gap, size }) => {
	const renderedRows = rows.map(columns => (
		<Fragment>
			{/*{ msoOpen }*/}
			<tr>
				{/*{ msoClose }*/}
				{ renderColumns({ columns, gap, size }) }
				{/*{ msoOpen }*/}
			</tr>
			{/*{ msoClose }*/}
		</Fragment>
	));

	return gap
		? insertBetween(renderedRows, renderRowGap({ gap, size }))
		: renderedRows;
};

const AutoGrid = props => {
	const {
		// size = 3,
		gap = 0,
		children
	} = props;

	const size = props.size ? parseMediaQueryAttr(props.size).value : 0;

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

	const childNodes = renderRows({ rows: partitions, gap, size });

	return (
		<table {...ieTableProps} width="100%">
			<div>
				{ childNodes }
			</div>
		</table>
	);
};

AutoGrid.css = {
	'.auto-grid': {
		display: 'flex'
	},
	'.auto-grid__empty-item': {
		flexGrow: 1
	}
};

AutoGrid.styles = props => {
	const sizeQueries = props.size ? parseMediaQueryAttr(props.size).mediaQueries : 0;

	return {
		'.auto-grid': {
			width: 100 / props.span
		},
		[`@media ${props.padding}`]: {

		}
	}
};

export default AutoGrid;