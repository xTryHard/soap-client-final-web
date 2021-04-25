'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to Summoners Rift');
});
app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

