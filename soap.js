'use strict';

const soap = require('soap');

class SoapClient {

    constructor(url) {
        this.url = url;
        this.client = soap.createClientAsync(url);
    }


    getFormsByUsername(username) {
        this.client.then((clientReference) => {
            return client.getFormsByUsername({arg0: username});
        }).then(result => {return result[0]});
    }

    postForm(form) {
        this.client.then((clientReference) => {
            return clientReference.postFormAsync({arg0: form});
        }).then(result => {return result[0]});
    }
}

