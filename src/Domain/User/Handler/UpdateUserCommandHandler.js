import UserDB from "../Projection/UserDB";
import {InvalidException} from "../Exception/InvalidException";
import {CanNotUpdateUserException} from "../Exception/CanNotUpdateUserException";

export class UpdateUserCommandHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof UpdateUserCommandHandler) {
                this.command = command;

                try {
                    let updated = this.updateUser();
                    resolve(updated);
                } catch (exception) {
                    throw new CanNotUpdateUserException(exception);
                }
            } else {
                reject(new InvalidException('command must be instanceof UpdateUserCommand!'));
            }
        });
    }

    updateUser() {
        return UserDB.findByIdAndUpdate(this.command.userId, {
            $set: this.command.data
        }, {
            new: true
        });
    }
}