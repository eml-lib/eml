import { validate } from '../parsers/dimension-box';
import createPropType from './helpers/create-prop-type';

export default valueParseFn => createPropType(value => {
	try {
		console.log(222);
		return validate(value, valueParseFn);
	} catch (e) {
		console.log(22, e);
		return e;
	}
});