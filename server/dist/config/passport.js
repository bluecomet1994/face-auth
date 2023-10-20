"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passportJWT = require("passport-jwt");
const UserModel_1 = require("../models/UserModel");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};
function passport_verify(passport) {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        UserModel_1.default.findById(jwt_payload._id)
            .then(user => {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
}
exports.default = passport_verify;
//# sourceMappingURL=passport.js.map