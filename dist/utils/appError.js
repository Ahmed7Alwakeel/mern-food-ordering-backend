"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, status = "FAIL", statusCode = 500, errors = undefined) {
        super();
        this.message = message;
        this.status = status;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.default = AppError;
