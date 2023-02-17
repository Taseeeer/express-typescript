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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const databaseConnection_1 = __importDefault(require("./lib/databaseConnection"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Schemas
const User_1 = __importDefault(require("./schemas/User"));
//database conneciton
(0, databaseConnection_1.default)();
//get all the users
app.get('/', (req, res) => {
    res.send('Express+Ts');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    return res.send(users);
}));
// get single user
app.post('/user/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const user = yield User_1.default.findOne({ name });
    if (!user) {
        return res.status(404).send('Not found');
    }
    return res.send(user);
}));
//register user
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user)
        return res.send('User exists already!');
    const newUser = User_1.default.create(req.body);
    return res.send(newUser);
}));
//deactivate user
app.delete('/delme', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const user = yield User_1.default.findOne({ name });
    const removedUser = yield User_1.default.deleteOne({ name }).remove().exec();
    return res.send(`${user.name} removed!`);
}));
//update user
app.put('/update/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const { newname } = req.body;
    const user = yield User_1.default.updateOne({ name }, { $set: { name: newname } });
    return res.send(user);
}));
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
