const {getOptions} = require('loader-utils');
const {transform} = require('@babel/core');
const {validate} = require('schema-utils');
const util = require('util');
const schema = require('./babelSchema.json');

const transformAsync = util.promisify(transform);

module.exports = function (content, map, meta) {
    const callback = this.async();
    const options = getOptions(this) || {};
    validate(schema, options, {name: 'Babel Loader'});
    transformAsync(content, options).then(result => {
        callback(null, result.code, result.map, result.meta);
    }).catch(err => {
        callback(err);
    });
}