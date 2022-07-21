const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes/api/tasks');
const eventsRouter = require('./routes/api/events');
const db = require('./models/task');
const eventsDb = require('./models/event');
const bodyParser = require("body-parser");
const cors = require('cors');

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

const decodeIDToken = require('./authenticateToken');
app.use(decodeIDToken);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// tasks API routes
app.use('/api/tasks', router);

// events API routes
app.use('/api/events', eventsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));