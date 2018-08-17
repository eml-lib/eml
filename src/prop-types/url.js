import urlRegexp from 'url-regex';
import createPropType from './helpers/create-prop-type';

export default createPropType(value => {
	if (!urlRegexp({ exact: true }).test(value)) {
		return new TypeError('expected correct URL');
	}
});