import restify from "restify";
import mongoose, { mongo } from "mongoose";

/**
 * Creating server
 */
const server = restify.createServer({
    name: "restify-mongoose-example",
    ignoreTrailingSlash: true
});

require("dotenv").config({
    path: "./.env"
});

/**
 * Attempt to connect to MongoDB server
 */
mongoose.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database connection established successfully.");
}).catch(err => {
    throw err;
});

/**
 * Configure server parser
 */
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.acceptParser(server.acceptable));

/**
 * Register routers
 */
const router = require("./app/Http/Routes/index");
router.applyRoutes(server);

/**
 * Starting server
 */
server.listen(3000, () => {
    console.log("%s starting at %s", server.name, server.url);
});