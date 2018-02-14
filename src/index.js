const emlCore = require('../eml-core/build.js');
// import emlCore from 'eml-core';
import * as components from './components';

const settings = {
    components,
    options: {
        clients: [
            'outlook'
        ]
    }
};

export default emlCore.parse(`
    <flex width="0px">
        123
    </flex>
`, settings);