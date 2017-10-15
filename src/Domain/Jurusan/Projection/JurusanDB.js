import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Defining schema
 */
const jurusan = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Creating collection
 */
const Jurusan = mongoose.model('Jurusan', jurusan);

/**
 * Exporting module
 */
export default Jurusan;