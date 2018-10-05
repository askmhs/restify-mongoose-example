import { ResponseBuilder } from "./../Responses/ResponseBuilder";
import { UpdateUser } from "./../../../src/User/Application/UpdateUser";
import { CreateNewUser } from "./../../../src/User/Application/CreateNewUser";
import { User } from "./../../../src/User/Infrastructure/Data/Persistence/User";

const RouterInstance = require('restify-router').Router;
const router = new RouterInstance();

/**
 * Get all user
 */
router.get("/", async (req, res) => {
    try {
        return new ResponseBuilder().success(res, "Successfully get user data.", await new User().all());
    } catch (exception) {
        return new ResponseBuilder().internalServerError(res, [exception.message]);
    }
});

/**
 * Get detail user
 */
router.get("/:id", async(req, res) => {
    try {
        return new ResponseBuilder().success(res, "Successfully get user detail!", await new User().detailById(req.params.id));
    } catch (exception) {
        return new ResponseBuilder().internalServerError(res, [exception.message]);
    }
});

/**
 * Create new user
 */
router.post("/", async(req, res) => {
    try {
        const user = await new CreateNewUser().store(req.body);
        return new ResponseBuilder().success(res, "Successfully create new user!", user);
    } catch (exception) {
        return new ResponseBuilder().internalServerError(res, [exception.message]);
    }
});

/**
 * Update user
 */
router.put("/:id", async(req, res) => {
    try {
        const user = await new UpdateUser().update(req.params.id, req.body);
        return new ResponseBuilder().success(res, "Successfully update user data!", user);
    } catch (exception) {
        return new ResponseBuilder().internalServerError(res, [exception.message]);
    }
});

module.exports = router;