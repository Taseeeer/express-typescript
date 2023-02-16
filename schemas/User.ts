const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model('User', UserSchema);

export default User;