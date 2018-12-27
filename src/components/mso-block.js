import msoTableProps from './helpers/mso-table-props';

export default (props, context) => {
	const {
		width,
		children
	} = props;

	const {
		color,
		textAlign,
		fontSize,
		lineHeight
	} = context;

	return (
		<table {...msoTableProps} width={width}>
			<tr>
				<td>
					{ children }
				</td>
			</tr>
		</table>
	)
};
