"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const RegisterValidationSchema = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .isEmail(),
    (0, express_validator_1.body)('name')
        .notEmpty()
        .isString(),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 30 }),
    (0, express_validator_1.body)('confirm')
        .notEmpty()
        .isString()
        .custom((value, { req }) => value === req.body.password),
    (0, express_validator_1.body)('faceDescriptor')
        .notEmpty()
];
exports.default = RegisterValidationSchema;
//# sourceMappingURL=RegisterValidationSchema.js.map