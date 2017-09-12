export class InvalidException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}