"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.default = mongoose.model('users', UserSchema);
//# sourceMappingURL=UserModel.js.map