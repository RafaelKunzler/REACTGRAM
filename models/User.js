const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSChema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage:  String,
    bio: String,
},
{
    timestamps: true
})

const User = mongoose.model("User", userSChema)

module.exports = User;