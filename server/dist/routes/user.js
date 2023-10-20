"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const UserController_1 = require("../controllers/UserController");
const RegisterValidationSchema_1 = require("../validations/RegisterValidationSchema");
const LoginValidationSchema_1 = require("../validations/LoginValidationSchema");
const router = express.Router();
router.post('/register', RegisterValidationSchema_1.default, UserController_1.default.register);
router.post('/login', LoginValidationSchema_1.default, UserController_1.default.login);
router.post('/face-login', UserController_1.default.loginWithFace);
router.get('/access-token', passport.authenticate('jwt', { session: false }), UserController_1.default.accessToken);
exports.default = router;
//# sourceMappingURL=user.js.map