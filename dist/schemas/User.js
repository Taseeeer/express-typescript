"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = new mongoose.model('User', UserSchema);
exports.default = User;
