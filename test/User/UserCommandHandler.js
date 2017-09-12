import assert from 'assert';
import {before, describe, it} from 'mocha';
import {Decorator} from "../../src/Domain/Decorator";
import {User} from "../../src/Domain/User/Model/User";
import {DeleteUserCommand} from "../../src/Domain/User/Command/DeleteUserCommand";
import {CreateNewUserCommand} from "../../src/Domain/User/Command/CreateNewUserCommand";
import {CreateNewUserCommandHandler} from "../../src/Domain/User/Handler/CreateNewUserCommandHandler";

const director = require('director.js');
const promiseBus = director();

describe('User Command Handler Test', () => {
    describe('Create new user command handler test', () => {
        function createUser(command, data) {
            command.prototype.ID = 'createNewUserCommand';

            promiseBus.registry.register(command.prototype.ID, new CreateNewUserCommandHandler());
            const bus = new Decorator(promiseBus);

            return bus.handle(new command(data));
        }

        describe('Success create new user', () => {
            let createdData;

            before((done) => {
                const birthDate = new Date('1997-21-04');

                let data = new User('Muhammad Harits Syaifulloh', birthDate, 'Malang', '08123456789');

                createUser(CreateNewUserCommand, data).then((created) => {
                    createdData = created;
                    done();
                });
            });

            it('Should have an id', (done) => {
                assert.notEqual(null, createdData._id);
                done();
            });
        });

        describe('Error create new user because of invalid command', () => {
            let invalid;

            before((done) => {
                createUser(DeleteUserCommand, 'Data').then(() => {
                }).catch((errCreated) => {
                    invalid = errCreated;
                    done();
                });
            });

            it('Should throw an error response', (done) => {
                const x = (invalid instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have "command must be instanceof CreateNewUserCommand!" message', (done) => {
                assert.equal("command must be instanceof CreateNewUserCommand!", invalid.message);
                done();
            });
        });

        describe('Error create new user because of invalid data', () => {
            let error;

            before((done) => {
                createUser(CreateNewUserCommand, new User(null, null, null, null)).then(() => {
                }).catch((errCreated) => {
                    error = errCreated;
                    done();
                });
            });

            it('Should throw an error response', (done) => {
                const x = (error instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.notEqual(null, error.message);
                done();
            });
        });
    });
});