"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const connectDB_1 = require("./config/connectDB");
const routes_1 = require("./routes");
const passport_1 = require("./config/passport");
dotenv.config();
(0, connectDB_1.default)();
const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
(0, passport_1.default)(passport);
app.get('/', (req, res) => res.send("Response from the server"));
app.use('/api', routes_1.default);
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
//# sourceMappingURL=index.js.map