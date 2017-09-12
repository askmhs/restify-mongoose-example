import assert from 'assert';
import {describe, it} from 'mocha';
import {User} from "../../src/Domain/User/Model/User";
import {InvalidException} from "../../src/Domain/User/Exception/InvalidException";
import {CreateNewUserCommand} from "../../src/Domain/User/Command/CreateNewUserCommand";

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

            assert.equals(dummy, data);
        });

        it('Should throw an InvalidException if data is not instanceof User', () => {
            let dummy = {
                name: 'Muhammad Harits Syaifulloh',
                birthDate: '1997-04-21',
                address: 'Malang',
                phone: '08123456789'
            };

            assert.throw(() => {
                new CreateNewUserCommand(dummy)
            }, InvalidException, 'userData must be implemented from User class!');
        });
    });
});