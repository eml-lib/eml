/**
 * Inserts an item between each item of array
 * @param {Array} array
 * @param {*} itemBetween
 * @returns {Array} New Array
 */
export default (array, itemBetween) => array.reduce((acc, item, i) => (
	i === 0
		? [...acc, item]
		: [...acc, itemBetween, item]
), []);