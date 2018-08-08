import { repeatImpl as repeat } from './string-repeat';

it('digit', () => {
	expect(
		repeat('A', 5)
	).toEqual(
		'AAAAA'
	);
});