require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const connection = require('../database/db.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) =>{
    res.status(200).json('Hello World !');
});

const posts = require('../routes/posts.js');
const languages = require('../routes/languages.js');

app.use('/posts', posts);
app.use('/languages', languages);

app.listen(process.env.PORT, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${process.env.PORT}`);
});

module.exports = app