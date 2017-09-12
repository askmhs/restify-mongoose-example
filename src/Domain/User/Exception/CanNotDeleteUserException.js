export class CanNotDeleteUserException extends Error {
    constructor(message) {
        super(message);
    }
}