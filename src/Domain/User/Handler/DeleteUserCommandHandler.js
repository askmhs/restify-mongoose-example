import UserDB from "../Projection/UserDB";
import {DeleteUserCommand} from "../Command/DeleteUserCommand";
import {InvalidException} from "../Exception/InvalidException";
import {NotFoundException} from "../Exception/NotFoundException";
import {CanNotDeleteUserException} from "../Exception/CanNotDeleteUserException";

export class DeleteUserCommandHandler {
    /**
     * Excuting command
     * @param command
     * @returns {Promise}
     */
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof DeleteUserCommand) {
                this.command = command;

                this.deleteUser().then((removed) => {
                    if (removed !== null) {
                        resolve(removed);
                    } else {
                        reject(new NotFoundException('Couldn\'t find any user with id ' + command.userId));
                    }
                }).catch((errRemoved) => {
                    reject(new CanNotDeleteUserException(errRemoved.message));
                });
            } else {
                reject(new InvalidException('command must be instanceof DeleteUserCommand!'));
            }
        });
    }

    /**
     * Delete user
     * @returns {Query}
     */
    deleteUser() {
        return UserDB.findByIdAndRemove(this.command.userId);
    }
}