const { inspect } = require('util');
const eml = require('./build');

function log(object) {
    return console.log(inspect(object, {
        colors: true,
        depth: Infinity
    }));
}

// console.log(eml);