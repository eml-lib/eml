import fromCount from './array-from-count';

it('digit', () => {
	expect(
		fromCount(5)
	).toEqual(
		[0, 1, 2, 3, 4]
	);
});

it('processed', () => {
	expect(
		fromCount(5, i => ({ a: i }))
	).toEqual(
		[{ a: 0 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
	);
});