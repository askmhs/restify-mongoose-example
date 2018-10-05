import UserEntity from "./../Domain/Entities/UserEntity";

export class UpdateUser {

    /**
     * Update user data by id
     * 
     * @param {*} user_id 
     * @param {*} data 
     */
    async update(user_id, data) {
        return UserEntity.findByIdAndUpdate(user_id, { $set: data }, { new: true }).then(updated => {
            if (updated !== null) {
                return updated;
            } else {
                throw new Error("Couldn't find anr user data!");
            }
        }).catch(error => {
            throw error;
        });
    }
}