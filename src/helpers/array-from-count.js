export default (times, processFn) => (
	Array.from({ length: times }, (_, i) => (
		processFn && typeof processFn === 'function' ? processFn(i) : i
	))
);