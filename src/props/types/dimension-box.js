import { validate } from '../parsers/dimension-box';
import createPropType from './helpers/create-prop-type';

export default valueParseFn => createPropType(value => {
	try {
		return validate(value, valueParseFn);
	} catch (e) {
		return e;
	}
});