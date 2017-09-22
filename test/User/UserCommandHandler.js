import assert from 'assert';
import {before, describe, it} from 'mocha';
import {Decorator} from "../../src/Domain/Decorator";
import {User} from "../../src/Domain/User/Model/User";
import {DeleteUserCommand} from "../../src/Domain/User/Command/DeleteUserCommand";
import {CreateNewUserCommand} from "../../src/Domain/User/Command/CreateNewUserCommand";
import {CreateNewUserCommandHandler} from "../../src/Domain/User/Handler/CreateNewUserCommandHandler";
import {DeleteUserCommandHandler} from "../../src/Domain/User/Handler/DeleteUserCommandHandler";
import {UpdateUserCommandHandler} from "../../src/Domain/User/Handler/UpdateUserCommandHandler";
import {UpdateUserCommand} from "../../src/Domain/User/Command/UpdateUserCommand";

const director = require('director.js');
const promiseBus = director();

describe('User Command Handler Test', () => {

    let userId;

    /**
     * Create new user command handler test
     */
    describe('Create new user command handler test', () => {
        function createUser(command, data) {
            command.prototype.ID = 'createNewUserCommand';

            promiseBus.registry.register(command.prototype.ID, new CreateNewUserCommandHandler());
            const bus = new Decorator(promiseBus);

            return bus.handle(new command(data));
        }

        /**
         * Success create new user
         */
        describe('Success create new user', () => {
            let createdData;

            before((done) => {
                let data = new User('Muhammad Harits Syaifulloh', new Date().toJSON(), 'Malang', '08123456789');

                createUser(CreateNewUserCommand, data).then((created) => {
                    createdData = created;
                    userId = created._id;
                    done();
                });
            });

            it('Should have an id', (done) => {
                assert.equal('object', typeof createdData._id); // It's because _id is an ObjectId
                done();
            });
        });

        /**
         * Error create new user because of invalid command
         */
        describe('Error create new user because command is not instanceof CreateNewUserCommand', () => {
            let invalid;

            before((done) => {
                createUser(DeleteUserCommand, 'Data').then(() => {
                }).catch((errCreated) => {
                    invalid = errCreated;
                    done();
                });
            });

            it('Should throws an error response', (done) => {
                const x = (invalid instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have "command must be instanceof CreateNewUserCommand!" message', (done) => {
                assert.equal("command must be instanceof CreateNewUserCommand!", invalid.message);
                done();
            });
        });

        /**
         * Error create new user because of invalid data
         */
        describe('Error create new user because of invalid data', () => {
            let error;

            before((done) => {
                createUser(CreateNewUserCommand, new User(null, null, null, null)).then(() => {
                }).catch((errCreated) => {
                    error = errCreated;
                    done();
                });
            });

            it('Should throws an error response', (done) => {
                const x = (error instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof error.message);
                done();
            });
        });
    });

    /**
     * Delete user command handler test
     */
    describe('Delete user command handler test', (done) => {
        function deleteUser(command, userId) {
            command.prototype.ID = 'deleteUserCommand';

            promiseBus.registry.register(command.prototype.ID, new DeleteUserCommandHandler());
            const bus = new Decorator(promiseBus);

            return bus.handle(new command(userId));
        }

        /**
         * Success delete user
         */
        describe('Success delete user', () => {
            let deleted;
            let userId = "59c4ef1fc13169180294a9fa";

            before((done) => {
                deleteUser(DeleteUserCommand, userId).then(function (response) {
                    deleted = response;
                    done();
                });
            });

            it('Should return a valid deleted user data', (done) => {
                assert.equal(userId, deleted._id);
                done();
            });
        });

        /**
         * Error delete user because command is not instanceof DeleteUserCommand
         */
        describe('Error delete user because command is not instanceof DeleteUserCommand', () => {
            let invalid;

            before((done) => {
                deleteUser(CreateNewUserCommand, new User()).then(() => {
                }).catch((errResult) => {
                    invalid = errResult;
                    done();
                });
            });

            it('Should throws an error response', (done) => {
                const x = (invalid instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof invalid.message);
                assert.equal('command must be instanceof DeleteUserCommand!', invalid.message);
                done();
            });
        });

        /**
         * Error delete user because data is not found
         */
        describe('Error delete user because data is not found', () => {
            let userId = '59bc7a8c171ddc032156ea1a';

            let notFound;

            before((done) => {
                deleteUser(DeleteUserCommand, userId).then(() => {
                }).catch((errResult) => {
                    notFound = errResult;
                    done();
                });
            });

            it('Should throws an error response', (done) => {
                const x = (notFound instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof notFound.message);
                assert.equal('Couldn\'t find any user with id ' + userId, notFound.message);
                done();
            });
        });

        /**
         * Error delete user because invalid userId
         */
        describe('Error delete user because invalid userId', () => {
            let userId = '9090';

            let error;

            before((done) => {
                deleteUser(DeleteUserCommand, userId).then(() => {
                }).catch((errResult) => {
                    error = errResult;
                    done();
                });
            });

            it('Should throws an error response', (done) => {
                const x = (error instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof error.message);
                done();
            });
        });
    });

    /**
     * Update user command handler
     */
    describe('Update user command handler', () => {
        function updateUser(command, data) {
            command.prototype.ID = 'updateUserCommand';

            promiseBus.registry.register(command.prototype.ID, new UpdateUserCommandHandler());
            const bus = new Decorator(promiseBus);

            return bus.handle(new command(data.userId, data.userData));
        }

        /**
         * Success update user
         */
        describe('Success update user', () => {
            const userId = '59bbe95d3a90a5052554b0a1';
            const userData = new User('Muhammad Harits Syaifulloh', new Date().toJSON(), 'Los Angles', '+628123456789');

            let updated;

            before((done) => {
                updateUser(UpdateUserCommand, {
                    userId: userId,
                    userData: userData
                }).then((result) => {
                    updated = result;
                    done();
                }).catch(() => {
                });
            });

            it('Should return a valid updated user data', (done) => {
                assert.equal(userId, updated._id);
                done();
            });
        });

        /**
         * Error update user because command is not instanceof UpdateUserCommand
         */
        describe('Error update user because command is not instanceof UpdateUserCommand', () => {
            const userId = '59bbe95d3a90a5052554b0a1';

            let invalid;

            before((done) => {
                updateUser(DeleteUserCommand, {
                    userId: userId
                }).then((result) => {
                }).catch((errResult) => {
                    invalid = errResult;
                    done();
                });
            });

            it('Should throws an error message', (done) => {
                const x = (invalid instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof invalid.message);
                assert.equal('command must be instanceof UpdateUserCommand!', invalid.message);
                done();
            });
        });

        /**
         * Error update user because user data is not found
         */
        describe('Error update user because user data is not found', () => {
            const userId = '59bbe95d3a90a5053665b1b2';
            const userData = new User('M Harits S', new Date().toJSON(), 'Los Angles', '+628123456789');

            let notFound;

            before((done) => {
                updateUser(UpdateUserCommand, {
                    userId: userId,
                    userData: userData
                }).then(() => {
                }).catch((errResult) => {
                    notFound = errResult;
                    done();
                });
            });

            it('Should throws an error response', (done) => {
                const x = (notFound instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof notFound.message);
                assert.equal('Couldn\'t find any user with id ' + userId, notFound.message);
                done();
            });
        });

        /**
         * Error update user because data is not valid
         */
        describe('Error update user because data is not valid', () => {
            let error;

            const userId = '59bbe95d3a90a5052554b0a1';
            const userData = new User('Ini name baru', null, {
                a: 0
            }, 12345);

            before((done) => {
                updateUser(UpdateUserCommand, {
                    userId: userId,
                    userData: userData
                }).then(() => {
                }).catch((errResult) => {
                    error = errResult;
                    done();
                });
            });

            it('Should throws error response', (done) => {
                const x = (error instanceof Error);
                assert.ok(x);
                done();
            });

            it('Should have an error message', (done) => {
                assert.equal('string', typeof error.message);
                done();
            });
        });
    });
});