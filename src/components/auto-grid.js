import createElement from '../create-element';
import Fragment from '../fragment';
import arrayPartition from '../helpers/array-partition';
import insertBetween from '../helpers/array-insert-between';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

const renderRowGap = gap => (
	<table {...ieTableProps}>
		<tr>
			<td height={gap} />
		</tr>
	</table>
);

const renderColumnGap = gap => (
	<td>
		<table {...ieTableProps} width={gap}>
			<tr>
				<td />
			</tr>
		</table>
	</td>
);

const renderColumn = (column) => (
	<Fragment>
		{ msoOpen }
		<td>
			{ msoClose }
			{ column }
			{ msoOpen }
		</td>
		{ msoClose }
	</Fragment>
);

const renderColumns = (columns, gap) => {
	const renderedColumns = columns.map(renderColumn);
	const columnsWithGaps = gap
		? insertBetween(renderedColumns, renderColumnGap(gap))
		: renderedColumns;

	return (
		<Fragment>
			{ columnsWithGaps }
		</Fragment>
	);
};

const renderRows = (rows, gap) => {
	const renderedRows = rows.map(columns => renderColumns(columns, gap));
	const rowsWithGaps = gap
		? insertBetween(renderedRows, renderRowGap(gap))
		: renderedRows;

	return (
		<Fragment>
			{ msoOpen }
			<tr>
				{ msoClose }
				{ rowsWithGaps }
				{ msoOpen }
			</tr>
			{ msoClose }
		</Fragment>
	);
};

export default props => {
	const {
		size = 3,
		gap = 0,
		children
	} = props;

	const partitions = arrayPartition(children, size);
	const childNodes = renderRows(partitions, gap);

	return (
		<Fragment>
			{ msoOpen }
			<table {...ieTableProps} width="100%">
				{ msoClose }

				{ notMsoOpen }
				<div>
					{ notMsoClose }

					{ childNodes }

					{ notMsoOpen }
				</div>
				{ notMsoClose }

				{ msoOpen }
			</table>
			{ msoClose }
		</Fragment>
	);
};