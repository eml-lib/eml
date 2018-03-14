// import emlCore from 'eml-core';
const emlCore = require('../eml-core/build.js');
import * as components from './components';

export default (eml, userSettings) => emlCore.parse(eml, {
    components: {
        ...components,
        ...userSettings
    }
});