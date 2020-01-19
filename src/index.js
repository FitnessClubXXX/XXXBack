import express from 'express';
import mongoose from 'mongoose';
import User from './schemas/user';

const app = express();
const port = 3003;
const connectionString = 'mongodb://heroku_m40drlsk:k14eq2dh8f0u00dkvm5o6ervd8@ds141631.mlab.com:41631/heroku_m40drlsk';

// Establish connection to database
mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log("Connection successful!");
});

// User collection endpoints
app.get('/users', (req, res) => {
  User.find().then((doc) => {
    res.send('index', {items: doc});
  })
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
