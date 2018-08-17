export default props => {
	const {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		...restProps
	} = props;

	return {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		...restProps
	};
};