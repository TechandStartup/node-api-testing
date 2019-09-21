const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();
const router = require('./routes/index');

const app = express();
const port = 3000;

// Connect to the MongoDB database
mongoose.connect(
  // Check if environment is 'test' to see what db uri to connect to.
  process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI, 
  { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, 
    useUnifiedTopology: true }
); 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to the Database.') });

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

module.exports = app;
