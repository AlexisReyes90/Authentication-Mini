const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { createToken } = require('./Users/userAuthToken');

const User = require('./Users/userModel');


const server = express();
server.use(helmet());
server.use(express.json());

mongoose.connect('mongodb://localhost/AuthDemo')
  .then(connection => {
    console.log('Connected to MongoDB.');
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err);
  })


  server.get('/', (req, res) => {
    res.status(200).json({ api: '!=== API IS RUNNING ===!' });
  });

  server.post('/register', (req, res) => {
    
    const userData = req.body;
    const newUser = new User(userData)
      newUser.save()
        .then(savedUser => {
            res.status(201).json(savedUser);
        })
        .catch(err => {
            res.status(500).json(err);
        })
  })

  server.put('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
    .then(user => {
      user.passwordChecker(password, loggedIn => {
        if(loggedIn) {
          const token = createToken(user)
          res.status(201).json({ user, token })
        } else {
          res.status(401)
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    })
  })


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
