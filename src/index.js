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

const classSchema = new mongoose.Schema({ id: Number, classTitle: String, startDate: String, endDate: String, cost: String, peopleLimit: String }, {collection : 'classes'});
const Class = mongoose.model('Class', classSchema, 'classes');

const carnetSchema = new mongoose.Schema({ id: Number, name: String, price: String, description: String, photos: Array, userId: String }, {collection : 'carnets'});
const Carnet = mongoose.model('Carnet', carnetSchema, 'carnets');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://fitness-front-prod.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res, next) => {
  res.send('App is working!');
});

app.get('/user/:id', (req, res, next) => {
  User.find((err, data) => {
    const email = req.params.id;
    if (email) {
      User.findOne({ mail: email }, (err, doc) => {
        if (doc && doc.mail === email) {
          res.status(200).send(doc);
        } else {
          res.sendStatus(404);
        }
      })
    } else {
      res.sendStatus(400)
    }
  })
});

app.post('/login', (req, res, next) => {
  if (req.body.mail && req.body.password) {
    User.findOne({ mail: req.body.mail }, (err, doc) => {
      if (doc) {
        if (doc.password === req.body.password) {        
          res.status(200).send(doc);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(404);
      }
    })
  } else {
    res.sendStatus(404);
  }
});

app.get('/classes', (req, res, next) => {
  Class.find((err, doc) => {
    if (!err) {
      res.status(200).send(doc);
    }
  })
});

app.get('/carnets', (req, res, next) => {
  Carnet.find((err, doc) => {
    if (!err) {
      res.status(200).send(doc);
    }
  })
});

app.get('/carnets/:id', (req, res, next) => {  
  const email = req.params.id;
  
  Carnet.find({ userId: email }, (err, doc) => {
    if (doc) {
      if (doc.length > 0) {
        res.status(200).send(doc);
      } else {
        res.sendStatus(404);
      }    
    } else {
      res.sendStatus(404);
    }
  });
});

app.post('/carnets', (req, res, next) => {
  if (req.body.mail && req.body.carnetId) {
    Carnet.findOneAndUpdate(
      { id: req.body.carnetId },
      { userId: req.body.mail },
      { new: false },
      (err, doc, response) => {
        if (!err) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      }
    );
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`App is listening on port ${port}`);
});
