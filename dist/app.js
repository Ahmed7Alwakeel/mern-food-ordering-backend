"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const user_route_1 = require("./routes/user.route");
const appError_1 = __importDefault(require("./utils/appError"));
const error_controller_1 = __importDefault(require("./controllers/error.controller"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, helmet_1.default)({
    hsts: false,
    crossOriginResourcePolicy: false, //for images at frontend
}));
const limiter = (0, express_rate_limit_1.default)({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests, please try again in an hour!",
});
exports.app.use("/api", limiter);
exports.app.use(express_1.default.json());
exports.app.use((0, express_mongo_sanitize_1.default)());
exports.app.use(express_1.default.static("src/public"));
exports.app.use("/health", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "Health ok!" });
})));
exports.app.use("/api/user", user_route_1.userRoute);
exports.app.all("*", (req, res, next) => {
    next(new appError_1.default("Not Found", "FAIL", 404));
});
//when pass that four params express knows that this entire function is an error handling middleware
exports.app.use(error_controller_1.default);
