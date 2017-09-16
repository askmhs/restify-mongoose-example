import {Decorator} from "../../Domain/Decorator";
import {User} from "../../Domain/User/Model/User";
import SuccessResponse from './../Responses/SuccessResponse';
import {DeleteUserCommand} from "../../Domain/User/Command/DeleteUserCommand";
import {UpdateUserCommand} from "../../Domain/User/Command/UpdateUserCommand";
import {CreateNewUserCommand} from "../../Domain/User/Command/CreateNewUserCommand";
import InternalServerErrorResponse from './../Responses/InternalServerErrorResponse';
import {DeleteUserCommandHandler} from "../../Domain/User/Handler/DeleteUserCommandHandler";
import {CreateNewUserCommandHandler} from "../../Domain/User/Handler/CreateNewUserCommandHandler";
import {UpdateUserCommandHandler} from "../../Domain/User/Handler/UpdateUserCommandHandler";

module.exports = (server) => {

    const director = require('director.js');
    const promiseBus = director();

    server.get('/', (req, res) => {
        res.json('Hello');
    });

    server.post('/user/create', (req, res) => {
        CreateNewUserCommand.prototype.ID = 'createNewUserCommand';

        promiseBus.registry.register(CreateNewUserCommand.prototype.ID, new CreateNewUserCommandHandler());
        const bus = new Decorator(promiseBus);

        const data = new User(req.body.name, req.body.birthDate, req.body.address, req.body.phone);

        bus.handle(new CreateNewUserCommand(data)).then((created) => {
            SuccessResponse(res, 'User created!', created);
        }).catch((errCreated) => {
            InternalServerErrorResponse(res, errCreated);
        });
    });

    server.put('/user/update/:userId', (req, res) => {
        UpdateUserCommand.prototype.ID = 'updateUserCommand';

        promiseBus.registry.register(UpdateUserCommand.prototype.ID, new UpdateUserCommandHandler());
        const bus = new Decorator(promiseBus);

        const data = new User(req.body.name, req.body.birthDate, req.body.address, req.body.phone);

        bus.handle(new UpdateUserCommand(req.params.userId, data)).then((updated) => {
            SuccessResponse(res, 'Successfully update user!', updated);
        }).catch((errUpdated) => {
            InternalServerErrorResponse(res, errUpdated);
        });
    });

    server.get('/user/delete/:userId', (req, res) => {
        DeleteUserCommand.prototype.ID = 'deleteUserCommand';

        promiseBus.registry.register(DeleteUserCommand.prototype.ID, new DeleteUserCommandHandler());
        const bus = new Decorator(promiseBus);

        bus.handle(new DeleteUserCommand(req.params.userId)).then((result) => {
            SuccessResponse(res, 'Successfully deleted user!', result);
        }).catch((errResult) => {
            InternalServerErrorResponse(res, errResult);
        });
    });
};