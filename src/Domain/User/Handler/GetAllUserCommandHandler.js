import UserDB from "../Projection/UserDB";

export class GetAllUserCommandHandler {
    constructor() {
        return new Promise((resolve, reject) => {
            UserDB.find().populate({
                path: 'jurusan', // Foreign key
                model: 'Jurusan', // Collection name
                select: 'name' // Which column will be displayed
            }).lean().then((users) => {
                resolve(users);
            }).catch((errUsers) => {
                reject(errUsers);
            });
        });
    }
}