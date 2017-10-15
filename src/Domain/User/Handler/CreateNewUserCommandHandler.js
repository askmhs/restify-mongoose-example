import UserDB from './../Projection/UserDB';
import {InvalidException} from "../Exception/InvalidException";
import {CreateNewUserCommand} from "../Command/CreateNewUserCommand";
import {CanNotCreateUserException} from "../Exception/CanNotCreateUserException";

export class CreateNewUserCommandHandler {
    /**
     * Executing command
     * @param command
     * @returns {Promise}
     */
    execute(command) {
        this.command = command;

        return new Promise((resolve, reject) => {
            if (command instanceof CreateNewUserCommand) {
                this.createUser().then((created) => {
                    resolve(created);
                }).catch((errCreated) => {
                    reject(new CanNotCreateUserException(errCreated.message));
                });
            } else {
                reject(new InvalidException('command must be instanceof CreateNewUserCommand!'));
            }
        });
    }

    /**
     * Store user to DB
     */
    createUser() {
        return UserDB.create(this.command.userData);
    }
}