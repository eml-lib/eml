export const repeatImpl = (string, times) => {
	let repeatedString = '';

	while (times > 0) {
		repeatedString += string;
		times--;
	}

	return repeatedString;
};

/**
 * @param {string} string
 * @param {number} times
 * @returns {string}
 */
const repeatBuiltin = (string, times) => string.repeat(times);

export default String.prototype.repeat ? repeatBuiltin : repeatImpl;