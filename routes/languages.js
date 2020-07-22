const express = require('express');
const connection = require('../database/db.js');

const router = express.Router();

/* ----- GET/ ----- */

router.get('/',(req, res) =>{
    connection.query('SELECT * FROM language', (err, results) => {
      if (err) {
        res.status(500).send({ message: 'Erreur lors de la récupération des languages!' });
      } else {
        res.status(200).json(results);
      }
    });
});

/* ----- GET/id ----- */

router.get('/:id', (req, res) => {
    const idLanguages = req.params.id;
    connection.query('SELECT * FROM language WHERE id = ?', [idLanguages], (err, results) => {
      if (err) {
        res.status(500).send({ message: 'Erreur lors de la récupération d\'un language !' });
      } 
      if (results.length === 0) {
        return res.status(404).send({ message: 'Language non trouvé !' });
      } else {
        res.json(results[0]);
      }
    });
});

/* ----- POST/ ----- */

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.name == null || formData.name === '') {
      res.status(400).send({ message: 'Le nom du language est mal renseigné !' });
    } else {
      connection.query('INSERT INTO language SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: 'Erreur lors de la sauvegarde d\'un language !' });
        } else {
          res.status(201).send({...formData});
        }
      });
    }
});

/* ----- PUT/id ----- */

router.put('/:id', (req, res) => {
    const idLanguages = req.params.id;
    const formData = req.body;
    if (formData.name == null || formData.name === '') {
      res.status(400).send({ message: 'Les données sont mal renseignées !' });
    } else {
      connection.query('UPDATE language SET ? WHERE id = ?' , [formData, idLanguages], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: 'Erreur lors de la sauvegarde d\'un language !' });
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* ----- DELETE/id ----- */

router.delete('/:id', (req, res) => {
    const idLanguages = req.params.id;
    connection.query('DELETE FROM language WHERE id = ?', idLanguages, err => {
      if (err) {
        res.status(500).send({ message: 'Erreur lors de la suppression d\'un language !' });
      } else {
        res.status(204);
      }
    });
});

module.exports = router;