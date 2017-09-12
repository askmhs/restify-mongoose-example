import {User} from "../Model/User";
import {InvalidException} from "../Exception/InvalidException";

export class UpdateUserCommand {
    constructor(userId, data) {
        if (data instanceof User) {
            this.userId = userId;
            this.data = data;
        } else {
            throw new InvalidException('data must be implemented from User class!');
        }
    }
}