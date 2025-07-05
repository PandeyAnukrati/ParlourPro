"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password, 10);
}
function comparePassword(password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
}
