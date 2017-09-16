import {User} from "../Model/User";
import {InvalidException} from "../Exception/InvalidException";

export class CreateNewUserCommand {
    constructor(userData) {
        if (userData instanceof User) {
            this.userData = userData;
        } else {
            throw new InvalidException('userData must be instanceof User class!');
        }
    }
}