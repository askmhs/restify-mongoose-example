import * as _ from "lodash";
import UserDB from "../Projection/UserDB";
import {UpdateUserCommand} from "../Command/UpdateUserCommand";
import {InvalidException} from "../Exception/InvalidException";
import {NotFoundException} from "../Exception/NotFoundException";
import {CanNotUpdateUserException} from "../Exception/CanNotUpdateUserException";

export class UpdateUserCommandHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof UpdateUserCommand) {
                this.command = command;

                this.updateUser().then((updated) => {
                    if (updated !== null) {
                        resolve(updated);
                    } else {
                        reject(new NotFoundException('Couldn\'t find any user with id ' + command.userId));
                    }
                }).catch((errUpdated) => {
                    reject(new CanNotUpdateUserException(errUpdated.message));
                });
            } else {
                reject(new InvalidException('command must be instanceof UpdateUserCommand!'));
            }
        });
    }

    updateUser() {
        this.command.data = _.pickBy(this.command.data, _.identity);

        return UserDB.findByIdAndUpdate(this.command.userId, {
            $set: this.command.data
        }, {
            new: true
        });
    }
}