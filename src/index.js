const emlCore = require('../eml-core/build.js');
// import emlCore from 'eml-core';
import * as components from './components';

const options = {
    components,
    clients: [
        'outlook'
    ]
};

export default emlCore.parse(`
    <eml>
        <flex>
            <flex>zozo</flex>
            <flex>
                <flex>123</flex>
                <flex>456</flex>
                <flex>789</flex>
            </flex>
        </flex>
    </eml>
`, options);