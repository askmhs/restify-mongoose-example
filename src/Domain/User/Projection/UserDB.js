import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Defining schema
 * @type {Schema|*}
 */
let userDB = new Schema({
    name: {
        type: String,
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
    jurusan: {
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

/**
 * Creating collection
 */
let UserDB = mongoose.model('UserDB', userDB);

/**
 * Exporting module
 */
export default UserDB;