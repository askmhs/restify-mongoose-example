const mongoose = require('mongoose');
const promise = require('bluebird');

mongoose.Promise = promise;

const datasource = mongoose.connect('mongodb://127.0.0.1:27017/restify-mongoose-example');
module.exports = datasource;