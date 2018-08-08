import { repeatImpl as repeat } from './string-repeat';

it('regular', () => {
	expect(
		repeat('A', 5)
	).toEqual(
		'AAAAA'
	);
});