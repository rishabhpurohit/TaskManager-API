const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user')

const user1Id = new mongoose.Types.ObjectId();
const user1 = {
    _id: user1Id,
    name:'Xiao',
    email:'xiao@gg.com',
    password:"i don't need no rest",
    tokens:[{
        token:jwt.sign({_id:user1Id},process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany();     
    await new User(user1).save();
}

module.exports = {
    user1,
    user1Id,
    setupDatabase
}