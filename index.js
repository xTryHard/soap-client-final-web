'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const SoapClient = require('./soapClient');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

const soapClient = new SoapClient('http://192.168.0.101:7000/ws/FormWebService?wsdl');
const path = require('path');

app.use(express.static('public'))

app.use(express.json());
// app.use(express.raw({
//     limit: "10mb"
// }));
app.use(morgan('dev'));
app.use(cookieParser());

function validate(req, res, next) {
    if (req.cookies.user == null) {
        res.redirect('/login');
    }
    console.log(req.cookies);
    next();
}

app.use(validate);

app.get('/', (req, res) => {
    res.cookie('test', 'test', {maxAge: 10800});


    res.sendFile('/public/html/index.html', {
        root: __dirname
    });
});

app.get('/validate-login', async (req, res) => {
   const credentials = req.body;
   let result = await fetch('http://192.168.0.101:7000/api/v1/login/', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           username: credentials.username,
           password: credentials.password
       })
   });

   result = await result.json();
   console.log(result);

   if (result.token != null && result.expires_in != null) {
       sessionStorage.setItem('user', credentials.username);
       res.redirect('/');
   } else {
       res.redirect('/login');
   }
});

app.get('/login', (req, res) => {
    res.sendFile('/public/html/login.html', {
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

app.get('/forms/:username', async (req, res) => {
    const forms = await soapClient.getFormsByUsername(req.params.username);
    res.json(forms);
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