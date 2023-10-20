"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("./user");
const router = express.Router();
router.use('/user', user_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map