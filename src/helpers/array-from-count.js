/**
 * Создает массив чисел от нуля (включительно) до значения `times`
 * Функция `processFn` позволяет обработать число до записи в массив
 *
 * @param {number} times Длина массива
 * @param {Function=} processFn Функция обработки каждого элемента. Принимает индекс элемента
 * @returns {Array} Массив элементов
 */
export default (times, processFn) => {
	const arr = [];

	for (let i = 0; i < times; i++) {
		arr.push(processFn && typeof processFn === 'function' ? processFn(i) : i);
	}

	return arr;
};
