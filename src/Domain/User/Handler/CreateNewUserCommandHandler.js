import UserDB from './../Projection/UserDB';
import {InvalidException} from "../Exception/InvalidException";
import {CreateNewUserCommand} from "../Command/CreateNewUserCommand";
import {CanNotCreateUserException} from "../Exception/CanNotCreateUserException";

export class CreateNewUserCommandHandler {
    execute(command) {
        this.command = command;

        return new Promise((resolve, reject) => {
            if (command instanceof CreateNewUserCommand) {
                this.createUser().then((created) => {
                    resolve(created);
                }).catch((errCreated) => {
                    reject(new CanNotCreateUserException(errCreated));
                });
            } else {
                reject(new InvalidException('command must be instanceof CreateNewUserCommand!'));
            }
        });
    }

    createUser() {
        return UserDB.create({
            name: this.command.userData.name,
            birthDate: this.command.userData.birthDate,
            address: this.command.userData.address,
            phone: this.command.userData.phone
        });
    }
}