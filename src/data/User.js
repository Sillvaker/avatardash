const { Schema, model } = require('mongoose');

const user = new Schema({
    _id: String,
    usename: { type: String },
    avatar: { type: String },
    
    data: { type: Array }
    
});

module.exports = model('users', user)