'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const SoapClient = require('./soapClient');

const soapClient = new SoapClient('http://192.168.0.101:7000/ws/FormWebService?wsdl');

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to Summoners Rift');
});

app.get('/test', (req, res) => {
    soapClient.test();
});

app.get('/forms/:username', (req, res) => {
    soapClient.getFormsByUsername(req.params.username);
});

app.post('/forms', (req, res) => {
    console.log("Received:");
    soapClient.postForm(req.body);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

