import { validate } from '../parsers/length';
import createPropType from './helpers/create-prop-type';

export default unitTypes => createPropType(value => {
	try {
		validate(value, unitTypes);
	} catch (e) {
		return e;
	}
});