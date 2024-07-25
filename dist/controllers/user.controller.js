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
const catchAsync_1 = require("../utils/catchAsync");
const user_model_1 = __importDefault(require("../models/user.model"));
class User {
    constructor() {
        this.createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.create(Object.assign({}, req.body));
            res.status(200).json({
                status: "success",
                data: user,
            });
        }));
        this.getUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ _id: req.userId });
            res.status(200).json({
                status: "success",
                data: user,
            });
        }));
        this.updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, addressLine1, country, city } = req.body;
            const user = yield user_model_1.default.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.name = name;
            user.addressLine1 = addressLine1;
            user.city = city;
            user.country = country;
            yield user.save();
            res.send(user);
        }));
    }
}
exports.default = new User();
