import flatten from './array-flatten';

describe('Depth', () => {
	it('zero', () => {
		expect(
			flatten([1, [2, [3]]], 0)
		).toEqual(
			[1, [2, [3]]]
		)
	});

	it('infinite', () => {
		expect(
			flatten([1, [2, [3, [4, [5, [6, [7, [8, [9, [10, [11, [12]]]]]]]]]]]], Infinity)
		).toEqual(
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		)
	});
});