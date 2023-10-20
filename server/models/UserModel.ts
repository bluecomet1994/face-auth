import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    faceDescriptor: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('users', UserSchema);