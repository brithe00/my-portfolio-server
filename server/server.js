require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const connection = require('../database/db.js');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/jwt');
const { authenticateWithJwt } = require('../services/jwt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json('Hello World !');
});

const posts = require('../routes/posts.js');
const languages = require('../routes/languages.js');

app.use('/posts', authenticateWithJwt, posts);
app.use('/languages', authenticateWithJwt, languages);

/* ----- GET ALL POSTS WITH NO TOKEN ----- */

app.get('/posts_visible',(req, res) =>{
  connection.query('SELECT * FROM post', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération des posts !' });
    } else {
      res.status(200).json(results);
    }
  });
});

/* ----- REGISTER ----- */

app.post('/users/register', (req, res) => {
  const formData = req.body;
  if ((formData.username == null || formData.username === '') || (formData.password == null || formData.password === '')) {
    res.status(422).json("Erreur lors de l'enregistrement");
  } else {
    connection.query('SELECT * FROM user WHERE username = ?', formData.username, (err, results) => {
      if (results[0] != null) {
        res.status(500).json({ message: "Username deja utilisé" });
      } else {
        bcrypt.hash(formData.password, 10, function (err, hash) {
          formData.password = hash
          connection.query('INSERT INTO user SET ?', formData, (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("Erreur lors de l'enregistrement");
            } else {
              res.status(201).send({ id: results.insertId, ...formData, password: null });
            }
          });
        });
      }
    })
  }
});

/* ----- LOGIN ----- */

app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  if ((username == null || username === '') || (password == null || password === '')) {
    res.status(422).json("E-Mail ou Mot de passe incorrect");
  } else {
    connection.query('SELECT password FROM user WHERE username = ?', username, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'authentification");
      } else if (results[0] == null) {
        res.status(400).send("Cet utilisateur n'existe pas");
      } else {
        const hash = results[0].password;
        bcrypt.compare(password, hash, function (err, same) {
          if (same) {
            const token = createToken(username)
            res.json({
              username,
              token,
            });
          } else {
            res.status(400).send("Connexion refusée");
          }
        });
      }
    });
  }
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});

/*
app.post('/posts/languages', (req, res) => {
  const formData = req.body;
  const formDataLanguage = req.body.name

  if (formData.title == null || formData.title === '') {
    res.status(400).send({ message: 'Le nom du post est mal renseigné !' });
  } else {
    connection.query('INSERT INTO language SET ? INSERT INTO post SET ?', [formData, formDataLanguage], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Erreur lors de la sauvegarde d\'un post !' });
      } else {
        res.status(201).send({...formData, ...formDataLanguage});
      }
    });
  }
});
*/

module.exports = app