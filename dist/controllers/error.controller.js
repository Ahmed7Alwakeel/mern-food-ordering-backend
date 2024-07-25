"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
class ErrorHandler {
    constructor() {
        //like invalid object id mongo format
        this.handleCastErrorDB = (err) => {
            const message = `Invalid ${err.path} value.`;
            return new appError_1.default(message, "FAIL", 400);
        };
        //like unique inputs value
        this.handleDuplicateFieldsDB = (err) => {
            const keyName = Object.keys(err.keyPattern)[0];
            const message = `${keyName} already exits!`;
            return new appError_1.default(message, "FAIL", 400);
        };
        //like required inputs
        this.handleValidationErrorDB = (err) => {
            var _a;
            const errors = Object.values(err.errors).map((el) => ({
                [`${el.path}`]: el.message,
            }));
            const message = (_a = Object.values(err.errors)
                .map((el) => el.message)) === null || _a === void 0 ? void 0 : _a.join(". ");
            return new appError_1.default(message, "FAIL", 422, errors);
        };
        this.handleGeneralError = (message, code = 401) => {
            return new appError_1.default(message, "FAIL", code);
        };
        this.sendError = (error, res) => {
            res.status((error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
                status: (error === null || error === void 0 ? void 0 : error.status) || "FAIL",
                status_code: (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
                errors: error.errors || null,
                message: error.message,
            });
        };
        //when pass that four params express knows that this entire function is an error handling middleware
        this.globalError = (err, req, res, next) => {
            console.log(err);
            let error = Object.assign({}, err);
            if (err.name === "CastError")
                error = this.handleCastErrorDB(error);
            if (error.code === 11000)
                error = this.handleDuplicateFieldsDB(error);
            if (error.name === "ValidationError" ||
                (error.errors != null &&
                    Object.values(error.errors).map((el) => el.message)))
                error = this.handleValidationErrorDB(error);
            if (error.name === "JsonWebTokenError")
                error = this.handleGeneralError("Invalid token.!");
            if (error.name === "TokenExpiredError")
                error = this.handleGeneralError("Token expired! Please log in again.");
            this.sendError(error, res);
        };
    }
}
exports.default = new ErrorHandler().globalError;
