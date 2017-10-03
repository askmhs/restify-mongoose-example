import restify from 'restify';

const server = restify.createServer({
    name: 'restify-mongoose-example'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

require('./src/Http/Routers/User')(server);
require('./src/Http/Routers/Jurusan')(server);

server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;