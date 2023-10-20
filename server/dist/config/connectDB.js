"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.default = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected.'))
        .catch(error => console.log(error));
};
//# sourceMappingURL=connectDB.js.map