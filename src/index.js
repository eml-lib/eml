import emlCore from 'eml-core';
import * as components from './components';

export default (eml, userSettings) => emlCore(eml, {
    components: {
        ...components,
        ...userSettings
    }
});