import UserEntity from "./../../../Domain/Entities/UserEntity";

export class User {

    /**
     * Get all user data
     */
    async all() {
        return UserEntity.find().lean().then(user => {
            return user;
        }).catch(error => {
            throw error;
        });
    }

    /**
     * Get user data by id
     * 
     * @param {*} user_id 
     */
    async detailById(user_id) {
        return UserEntity.findById(user_id).lean().then(user => {
            if (user !== null) {
                return user;
            }

            throw new Error("Couldn't find any user data!");
        }).catch(error => {
            throw error;
        });
    }
}