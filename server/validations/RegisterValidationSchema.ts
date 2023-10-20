import { body } from 'express-validator';

const RegisterValidationSchema = [
    body('email')
        .notEmpty()
        .isEmail(),
        
    body('name')
        .notEmpty()
        .isString(),

    body('password')
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 30 }),

    body('confirm')
        .notEmpty()
        .isString()
        .custom((value, {req}) => value === req.body.password),

    body('faceDescriptor')
        .notEmpty()
];

export default RegisterValidationSchema;