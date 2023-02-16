"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);
const databaseConnection = () => {
    mongoose.connect('mongodb+srv://shah:shah123@the-emaily.dehhgj8.mongodb.net/?retryWrites=true&w=majority', () => {
        console.log('Database has connected successfully!');
    });
};
exports.default = databaseConnection;
