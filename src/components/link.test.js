import { renderComponent, createElement } from 'eml-core';
import Link from './link';

it('inline', () => {
	expect(
		renderComponent(
			<Link to="about:blank">
				Text
			</Link>
		)
	).toMatchSnapshot();
});

it('padding', () => {
	expect(
		renderComponent(
			<Link padding={10} to="about:blank">
				Text
			</Link>
		)
	).toMatchSnapshot();
});

it('width and height', () => {
	expect(
		renderComponent(
			<Link width={100} height={500} to="about:blank">
				Text
			</Link>
		)
	).toMatchSnapshot();
});
