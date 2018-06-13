export default (array, count, processFn) => array.reduce((acc, item, i) => {
	const column = processFn && typeof processFn === 'function' ? processFn(item) : item;

	if (i % count === 0) {
		const row = [column];
		return [...acc, row];
	} else {
		const row = acc[acc.length - 1];
		row.push(column);
		return acc;
	}
}, []);