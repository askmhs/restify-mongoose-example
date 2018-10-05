import mongoose, { mongo } from "mongoose";

/**
 * Define schema
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

/**
 * Create and export model
 */
export default mongoose.model("user", userSchema);