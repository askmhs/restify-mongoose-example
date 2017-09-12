import UserDB from "../Projection/UserDB";
import {InvalidException} from "../Exception/InvalidException";
import {CanNotDeleteUserException} from "../Exception/CanNotDeleteUserException";

export class DeleteUserCommandHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof DeleteUserCommandHandler) {
                this.command = command;

                try {
                    const deleted = this.deleteUser();
                    resolve(deleted);
                } catch (exception) {
                    throw new CanNotDeleteUserException(exception);
                }
            } else {
                reject(new InvalidException('command must be instanceof DeleteUserCommandHandler!'));
            }
        });
    }

    deleteUser() {
        return UserDB.findByIdAndRemove(this.command.userId);
    }
}