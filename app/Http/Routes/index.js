const RouterInstance = require('restify-router').Router;
const router = new RouterInstance();

/**
 * Register user routes
 */
router.add("/user", require("./user"));

module.exports = router;