import UserEntity from "./../Domain/Entities/UserEntity";

export class CreateNewUser {

    /**
     * Store user data to DB
     * 
     * @param {*} data 
     */
    async store(data) {
        return UserEntity.create(data).then(created => {
            return created;
        }).catch(error => {
            throw error;
        });
    }
}