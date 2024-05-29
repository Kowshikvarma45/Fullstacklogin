const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://<your database name>:<your password>@cluster0.c0hdkgh.mongodb.net/Usersdb")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };
