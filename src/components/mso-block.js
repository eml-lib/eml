import msoTableProps from './helpers/mso-table-props';

export default (props, contextProps) => {
	const {
		width,
		children
	} = props;

	const {
		color,
		textAlign,
		fontSize,
		lineHeight
	} = contextProps;

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