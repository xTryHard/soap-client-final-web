'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const SoapClient = require('./soapClient');

const soapClient = new SoapClient('https://final.theitshop.ninja/ws/FormWebService?wsdl');
const path = require('path');

app.use(express.static('public'))

app.use(express.json());
// app.use(express.raw({
//     limit: "10mb"
// }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile('/public/html/index.html', {
        root: __dirname
    });
});

app.get('/list', (req, res) => {
    res.sendFile('/public/html/listForms.html', {
        root: __dirname
    });
});

app.get('/test', (req, res) => {
    soapClient.test();
});

app.get('/forms/:username', (req, res) => {
    soapClient.getFormsByUsername(req.params.username);
});

app.post('/forms', (req, res) => {
    console.log("Received:");
    const form = req.body;
    console.log(form)
    soapClient.postForm(form);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});