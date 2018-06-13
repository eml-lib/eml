import insertBetween from './array-insert-between';

describe('Literals', () => {
	it('zero', () => {
		expect(
			insertBetween([1, 2, 3], 0)
		).toEqual(
			[1, 0, 2, 0, 3]
		)
	});
});

describe('Objects', () => {
	it('object', () => {
		expect(
			insertBetween([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 0 })
		).toEqual(
			[{ a: 1 }, { a: 0 }, { a: 2 }, { a: 0 }, { a: 3 }]
		)
	});
});