const mongoose = require('mongoose');

const { Schema } = mongoose;

const authModel = new Schema(
    {
        email: { type: String },
        password: { type: String },
        postid: { type: String }
    }
);

module.exports = mongoose.model('Check', authModel);