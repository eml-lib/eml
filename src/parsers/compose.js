export default (props, convertFnList) => convertFnList.reduce(
	(acc, convertFn) => ({ ...acc, ...convertFn(props) }),
	{}
);