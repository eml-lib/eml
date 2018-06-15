import createElement from '../create-element';
import Fragment from '../fragment';
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

export default props => {
	const {
		span,
		hasGap,
		children
	} = props;

	return (
		<Fragment>
			{ msoOpen }
			<td>
				{ msoClose }
				{ children }
				{ msoOpen }
			</td>
			{ msoClose }
		</Fragment>
	);
};