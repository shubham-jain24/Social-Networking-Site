const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
    {
        name: {type: String},
        email: { type: String },
        posts:{
                    postcontent: {type: String},
                    postimage: [
                        {type: String, default: null}
                    ],
                    domain: { type: String },
                    postupvote: {type: Number, default: 0}
                },
        age: { type: Number },
        gender: {type: String},
        liked: [
            {type: String, default: null}
        ]
    }
);

module.exports = mongoose.model('Book', bookModel);