import mongoose from 'mongoose';
import promise from 'bluebird';

mongoose.Promise = promise;

const datasource = mongoose.connect('mongodb://127.0.0.1:27017/restify-mongoose-example');
module.exports = datasource;