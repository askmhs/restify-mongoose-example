import {User} from "../Model/User";
import {InvalidException} from "../Exception/InvalidException";

export class UpdateUserCommand {
    constructor(userId, data) {
        if (typeof userId !== 'string') throw new InvalidException('userId must be a string!');
        if (!(data instanceof User)) throw new InvalidException('data must be instanceof User class!');

        this.userId = userId;
        this.data = data;
    }
}