"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const LoginValidationSchema = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .isEmail(),
    (0, express_validator_1.body)('password')
        .notEmpty()
];
exports.default = LoginValidationSchema;
//# sourceMappingURL=LoginValidationSchema.js.map