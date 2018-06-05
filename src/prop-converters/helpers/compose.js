export default (props, convertFnList) => convertFnList.reduce((accProps, convertFn) => convertFn(accProps), props);
