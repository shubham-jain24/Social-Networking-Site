const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

const db = mongoose.connect('mongodb://localhost/bookAPI', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });



const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');
const Check = require('./models/authModel');

const router = require('./router/bookRouter')(Book, Check);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', router);

app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

app.listen(port, () => {
    console.log(`Application Running on port ${port}`);
});