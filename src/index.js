import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3003;
const connectionString = 'mongodb://heroku_m40drlsk:k14eq2dh8f0u00dkvm5o6ervd8@ds141631.mlab.com:41631/heroku_m40drlsk';

// Establish connection to database
mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log("Connection successful!");
});

// Database schemas
const userSchema = new mongoose.Schema({ mail: String, password: String, name: String, surname: String }, {collection : 'users'});
const User = mongoose.model('User', userSchema, 'users');

const classSchema = new mongoose.Schema({ id: Number, classTitle: String, startDate: String, endDate: String, cost: String, peopleLimit: String }, {collection : 'users'});
const Class = mongoose.model('Class', classSchema, 'classes');

// User collection endpoints
app.get('/user/:id', (req, res) => {
  User.find((err, data) => {
    const email = req.params.id;
    if (email) {
      User.findOne({ mail: email }, (err, doc) => {
        if (doc && doc.mail === email) {
          res.send(doc);
        } else {
          res.sendStatus(404);
        }
      })
    } else {
      res.sendStatus(400)
    }
  })
});

app.post('/login', (req, res) => {
  if (req.body.mail && req.body.password) {
    User.findOne({ mail: req.body.mail }, (err, doc) => {
      if (doc.password === req.body.password) {        
        res.send(doc);
      } else {
        res.sendStatus(401);
      }
    })
  } else {
    res.sendStatus(404);
  }
});

app.get('/classes', (req, res) => {
  Class.find((err, doc) => {
    if (!err) {
      res.send(doc);
    }
  })
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
