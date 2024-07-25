"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.route("/").post(auth_1.jwtCheck, user_controller_1.default.createUser);
exports.userRoute.route("/").get(auth_1.jwtCheck, auth_1.jwtParse, user_controller_1.default.getUser);
exports.userRoute
    .route("/")
    .put(auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, user_controller_1.default.updateUser);
