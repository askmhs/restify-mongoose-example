import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userDB = new Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

let UserDB = mongoose.model('UserDB', userDB);
export default UserDB;