import UserDB from './../Projection/UserDB';
import {InvalidException} from "../Exception/InvalidException";
import {CreateNewUserCommand} from "../Command/CreateNewUserCommand";
import {CanNotCreateUserException} from "../Exception/CanNotCreateUserException";

export class CreateNewUserCommandHandler {
    execute(command) {
        this.command = command;

        return new Promise((resolve, reject) => {
            if (command instanceof CreateNewUserCommand) {
                try {
                    const createdUser = this.createUser();
                    resolve(createdUser);
                } catch (exception) {
                    throw CanNotCreateUserException(exception);
                }
            } else {
                reject(new InvalidException('command must be instanceof CreateNewUserCommand!'));
            }
        });
    }

    createUser() {
        return UserDB.create({
            name: this.command.name,
            birthDate: this.command.birthDate,
            address: this.command.address,
            phone: this.command.phone
        });
    }
}