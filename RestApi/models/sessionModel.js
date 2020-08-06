const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionModel = new Schema(
    {
        email: { type: String },
        password: { type: String }
    }
);

module.exports = mongoose.model('Session', sessionModel);