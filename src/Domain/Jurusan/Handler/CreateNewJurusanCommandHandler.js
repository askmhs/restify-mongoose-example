import JurusanDB from './../Projection/JurusanDB';
import {InvalidException} from "../Exception/InvalidException";
import {CreateNewJurusanCommand} from "../Command/CreateNewJurusanCommand";
import {CanNotCreateNewJurusanException} from "../Exception/CanNotCreateNewJurusanException";

export class CreateNewJurµusanCommandHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof CreateNewJurusanCommand) {
                this.command = command;

                this.createJurusan().then((created) => {
                    resolve(created);
                }).catch((errCreated) => {
                    console.log(errCreated);
                    reject(new CanNotCreateNewJµµurusanException('An error occurred while creating new jurusan data!'));
                });
            } else {
                throw new InvalidException('command must be instanceof CreateNewJurusanCommand!');
            }
        });
    }

    createJurusan() {
        return JurusanDB.create(this.command.jurusan);
    }
}