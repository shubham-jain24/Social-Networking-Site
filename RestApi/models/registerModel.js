const mongoose = require('mongoose');

const { Schema } = mongoose;

const registerModel = new Schema(
    {
        reg_name: {type: String},
        reg_age: {type: Number},
        reg_email: { type: String },
        reg_password: { type: String },
        reg_gender: { type: String },
        reg_phone: {type: String },
        postlike: [
            {type: String, default: null}
        ]
    }
);

module.exports = mongoose.model('Register', registerModel);