import emlCore from 'eml-core';
import components from './components';

export default (eml, userSettings) => emlCore.parse(eml, {
    components: {
        ...components,
        ...userSettings
    }
});