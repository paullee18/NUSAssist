// Duplicated index.js uploaded to github for mongoose db security reasons

const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes/api/tasks');
const db = require('./models/task');
const bodyParser = require("body-parser");

mongoose.connect(
    'mongodb+srv://nusassist:<PASSWORD>@nusassist.apx1xlz.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to database');
        })
        .catch((err) => {
            console.log('Error connecting to DB', err.message);
        });
    

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// tasks API routes
app.use('/api/tasks', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));