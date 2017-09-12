import assert from 'assert';
import {describe, it} from 'mocha';
import {User} from "../../src/Domain/User/Model/User";
import {InvalidException} from "../../src/Domain/User/Exception/InvalidException";
import {CreateNewUserCommand} from "../../src/Domain/User/Command/CreateNewUserCommand";
import {DeleteUserCommand} from "../../src/Domain/User/Command/DeleteUserCommand";
import {UpdateUserCommand} from "../../src/Domain/User/Command/UpdateUserCommand";

describe('User Command Test', () => {
    describe('Create new user command test', () => {
        it('Should return a user object data', () => {
            let dummy = {
                name: 'Muhammad Harits Syaifulloh',
                birthDate: '1997-04-21',
                address: 'Malang',
                phone: '08123456789'
            };

            let data = new CreateNewUserCommand(new User(dummy.name, dummy.birthDate, dummy.address, dummy.phone));

            assert.equal(dummy, data);
        });

        it('Should throw an InvalidException if data is not instanceof User', () => {
            let dummy = {
                name: 'Muhammad Harits Syaifulloh',
                birthDate: '1997-04-21',
                address: 'Malang',
                phone: '08123456789'
            };

            assert.throws(() => {
                new CreateNewUserCommand(dummy);
            }, InvalidException, 'userData must be implemented from User class!');
        });
    });

    describe('Delete user command test', () => {
        it('Should return object of uerId', () => {
            const userId = 'This is userId';
            let command = new DeleteUserCommand(userId);

            assert.equal(command.userId, userId);
        });

        it('Should throw InvalidException if userId is not a string', () => {
            assert.throws(() => {
                new DeleteUserCommand(99);
            }, InvalidException, 'UserId must be a string!');
        });
    });

    describe('Update user command test', () => {
        it('Should return object with userId and data inside', () => {
            const userId = 'This is userId';
            const dummy = {
                name: 'Muhammad Harits Syaifulloh',
                birthDate: '1997-04-21',
                address: 'Malang',
                phone: '08123456789'
            };

            const data = new User(dummy.name, dummy.birthDate, dummy.address, dummy.phone);

            const command = new UpdateUserCommand(userId, data);

            assert.equal(userId, command.userId);
            assert.equal(data, command.data);
        });

        it('Should throw an error if data is not instanceof User class', () => {
            const userId = 'This is userId';
            const data = {
                name: 'Muhammad Harits Syaifulloh',
                birthDate: '1997-04-21',
                address: 'Malang',
                phone: '08123456789'
            };

            assert.throws(() => {
                new UpdateUserCommand(userId, data);
            }, InvalidException, 'data must be implemented from User class!');
        });
    });
});