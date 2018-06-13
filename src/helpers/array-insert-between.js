export default (array, itemBetween) => array.reduce((acc, item, i) => (
	i === 0 ? [...acc, item] : [...acc, itemBetween, item]
), [])