import restify from 'restify';
import promise from 'bluebird';
import mongoose from 'mongoose';

/**
 * Creating server
 * @type {*|Server}
 */
const server = restify.createServer({
    name: 'restify-mongoose-example'
});

/**
 * Configure restify parser
 */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/**
 * Set mongoose default promise
 */
mongoose.Promise = promise;
mongoose.Promise = global.Promise;

/**
 * Connecting to DB
 */
mongoose.connect('mongodb://127.0.0.1:27017/restify-mongoose-example', {
    useMongoClient: true
}).then(() => {
    console.log('Successfully connected to DB!');
}, (err) => {
    throw new Error(err);
});

/**
 * Calling router
 */
require('./src/Http/Routers/User')(server);
require('./src/Http/Routers/Jurusan')(server);

/**
 * Starting server
 */
server.listen(8000, () => {
    console.log('%s listening at %s', server.name, server.url);
});

/**
 * Exporting module
 */
export default server;