import { validate } from '../parsers/length';
import createPropType from './helpers/create-prop-type';

export default unitTypes => createPropType(value => {
	try {
		console.log(333);
		return validate(value, unitTypes);
	} catch (e) {
		console.log(33, e);
		return e;
	}
});