import {Decorator} from "../../Domain/Decorator";
import SuccessResponse from "../Responses/SuccessResponse";
import {Jurusan} from "../../Domain/Jurusan/Model/Jurusan";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";
import {CreateNewJurusanCommand} from "../../Domain/Jurusan/Command/CreateNewJurusanCommand";
import {CreateNewJurusanCommandHandler} from "../../Domain/Jurusan/Handler/CreateNewJurusanCommandHandler";

module.exports = function (server) {
    const director = require('director.js');
    const promiseBus = director();

    server.post('/jurusan/create', (req, res) => {
        CreateNewJurusanCommand.prototype.ID = 'createNewJurusanCommand';

        promiseBus.registry.register(CreateNewJurusanCommand.prototype.ID, new CreateNewJurusanCommandHandler());
        const bus = new Decorator(promiseBus);

        let data = new Jurusan(req.body.name);

        bus.handle(new CreateNewJurusanCommand(data)).then((response) => {
            SuccessResponse(res, 'Successfully create jurusan!', response);
        }).catch((errResponse) => {
            console.log(errResponse);
            InternalServerErrorResponse(res, 'An error occurred!');
        });
    });
};