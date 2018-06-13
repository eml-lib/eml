import flatten from './array-flatten';

describe('deep', () => {
	it('zero-level', () => { expect(flatten([1, [2, [3]]])).toBe([1, [2, [3]]]) })
});