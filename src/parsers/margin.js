export default props => {
	const {
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		...restProps
	} = props;

	return {
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		...restProps
	};
};