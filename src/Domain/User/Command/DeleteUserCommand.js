import {InvalidException} from "../Exception/InvalidException";

export class DeleteUserCommand {
    constructor(userId) {
        if (typeof userId === 'string') {
            this.userId = userId;
        } else {
            throw new InvalidException('UserId must be a string!');
        }
    }
}