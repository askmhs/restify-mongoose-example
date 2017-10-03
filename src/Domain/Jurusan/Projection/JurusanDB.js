import mongoose from './../../../../config/datasource';

const Schema = mongoose.Schema;

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

const Jurusan = mongoose.model('Jurusan', jurusan);
export default Jurusan;