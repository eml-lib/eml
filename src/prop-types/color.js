import { validate } from '../parsers/color';
import createPropType from './helpers/create-prop-type';

export default createPropType(value => {
	if (!validate(value)) {
		return new TypeError('expected correct color');
	}
});