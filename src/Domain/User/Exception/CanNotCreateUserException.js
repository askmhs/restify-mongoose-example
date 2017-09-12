export class CanNotCreateUserException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}