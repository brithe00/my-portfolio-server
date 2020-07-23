const express = require('express');
const connection = require('../database/db.js');

const router = express.Router();

/* ----- GET/ ----- */

router.get('/',(req, res) =>{
    connection.query('SELECT * FROM post', (err, results) => {
      if (err) {
        res.status(500).send({ message: 'Erreur lors de la récupération des posts !' });
      } else {
        res.status(200).json(results);
      }
    });
});

/* ----- GET/id ----- */

router.get('/:id', (req, res) => {
    const idPosts = req.params.id;
    connection.query('SELECT * FROM post WHERE id = ?', [idPosts], (err, results) => {
      if (err) {
        res.status(500).send({ message: 'Erreur lors de la récupération d\'un post !' });
      } 
      if (results.length === 0) {
        return res.status(404).send({ message: 'Post non trouvé !' });
      } else {
        res.json(results[0]);
      }
    });
});

/* ----- POST/ ----- */

router.post('/', (req, res) => {
  const formData = req.body;
  if (formData.title == null || formData.title === '') {
    res.status(400).send({ message: 'Le nom du post est mal renseigné !' });
  } else {
    connection.query('INSERT INTO post SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Erreur lors de la sauvegarde d\'un post !' });
      } else {
        res.status(201).send({...formData});
      }
    });
  }
});

/* ----- PUT/id ----- */

router.put('/:id', (req, res) => {
    const idPosts = req.params.id;
    const formData = req.body;
    if (formData.title == null || formData.title === '') {
      res.status(400).send({ message: 'Les données sont mal renseignées !' });
    } else {
      connection.query('UPDATE post SET ? WHERE id = ?' , [formData, idPosts], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: 'Erreur lors de la sauvegarde !' });
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* ----- DELETE/id ----- */

router.delete('/:id', (req, res) => {
    const idPosts = req.params.id;
    connection.query('DELETE FROM post WHERE id = ?', idPosts, err => {
      if (err) {
        res.status(500).send({ message: 'Erreur lors de la suppression d\'un post !' });
      } else {
        res.status(204);
      }
    });
});

/*
router.get('/languages', (req, res) => {
  connection.query('SELECT post.id, title, description, post.media, link, date_created, date_updated, language.name FROM post JOIN language ON post.id=language.id', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération des informations !' });
    } else {
      res.status(200).json(results);
    }
  });
})
*/

module.exports = router;