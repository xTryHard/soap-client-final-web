'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const SoapClient = require('./soapClient');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

const soapClient = new SoapClient('https://final.theitshop.ninja/ws/FormWebService?wsdl');
const path = require('path');

app.use(express.static('public'))

app.use(express.json({
    limit: '50mb'
}));
// app.use(express.raw({
//     limit: "10mb"
// }));
app.use(morgan('dev'));
app.use(cookieParser());

function validate(req, res, next) {
    if (req.cookies.user == null) {
        console.log('si');
        res.redirect('/login');
    } else {
        console.log('siiiiii');
        next();
    }

}


app.get('/', validate, (req, res) => {
    res.sendFile('/public/html/index.html', {
        root: __dirname
    });
});

app.post('/validate-login', async (req, res, next) => {
    const credentials = req.body;
    console.log(credentials)
    let result = await fetch('https://final.theitshop.ninja/api/v1/login/', {
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
        res.cookie('user', credentials.username, {
            maxAge: 86400000
        });
        res.json({
            status: 200,
            username: credentials.username
        });
        console.log('Cookie created successfully');
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