import restify from 'restify';

const server = restify.createServer({
    name: 'restify-mongoose-example'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

restify.CORS.ALLOW_HEADERS.push('content-type');
restify.CORS.ALLOW_HEADERS.push('accesskey');
restify.CORS.ALLOW_HEADERS.push('secretkey');
server.pre(restify.CORS({'origins': ['*']}));

require('./src/Http/Routers/User')(server);

server.listen(8000, () => {

});

export default server;