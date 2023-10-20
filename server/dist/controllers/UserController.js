"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const faceapi = require("face-api.js");
const UserModel_1 = require("../models/UserModel");
class UserController {
    static async register(req, res) {
        const { errors } = (0, express_validator_1.validationResult)(req);
        if (errors.length > 0) {
            res.status(200).json({
                success: false,
                message: "Fields are invalid."
            });
        }
        else {
            const data = (0, express_validator_1.matchedData)(req);
            await UserModel_1.default.findOne({ email: data.email })
                .then(user => {
                if (user) {
                    res.status(200).json({
                        success: false,
                        message: "The user already exists."
                    });
                }
                else {
                    const newUser = new UserModel_1.default(data);
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(newUser.password, salt, async (error, hash) => {
                            newUser.password = hash;
                            await newUser.save()
                                .then((user) => res.status(200).json({
                                success: true,
                                message: 'Successfully registered!',
                                user
                            }));
                        });
                    });
                }
            });
        }
    }
    static async login(req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'https://face-verification.vercel.app');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        const { errors } = (0, express_validator_1.validationResult)(req);
        if (errors.length > 0) {
            res.status(200).json({
                success: false,
                message: "Fields are invalid."
            });
        }
        else {
            const data = (0, express_validator_1.matchedData)(req);
            await UserModel_1.default.findOne({ email: data.email })
                .then(user => {
                if (!user) {
                    res.status(200).json({
                        success: false,
                        message: "The user does not exist."
                    });
                }
                else {
                    bcrypt.compare(data.password, user.password)
                        .then((isMatch) => {
                        if (isMatch) {
                            const payload = {
                                _id: user._id,
                                email: user.email
                            };
                            jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                                res.status(200).json({
                                    success: true,
                                    message: "Welcome back!",
                                    token
                                });
                            });
                        }
                        else {
                            res.status(200).json({
                                success: false,
                                message: "Password is incorrect."
                            });
                        }
                    });
                }
            });
        }
    }
    static async accessToken(req, res) {
        res.status(200).json(_.pick(req.user, ['email', 'name', 'date']));
    }
    static async loginWithFace(req, res) {
        await UserModel_1.default.find()
            .then(users => {
            users.map(user => {
                if (faceapi.euclideanDistance(req.body.faceDescriptor, user.faceDescriptor) < 0.25) {
                    const payload = {
                        _id: user._id,
                        email: user.email
                    };
                    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                        res.status(200).json({
                            success: true,
                            message: "Welcome back!",
                            token
                        });
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        message: "The user cannot be recognized."
                    });
                }
            });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map