'use strict';

const soap = require('soap');

class SoapClient {

    constructor(url) {
        this.url = url;
        this.client = soap.createClientAsync(url);
    }

    // test() {
    //     soap.createClientAsync('http://192.168.0.101:7000/ws/FormWebService?wsdl').then((client) => {
    //         return client.getFormsAsync({
    //             arg0: 'admin'
    //         });
    //     }).then((result) => console.log(result[0].return));
    // }

    getFormsByUsername(username) {
        this.client.then((clientReference) => {
            return clientReference.getFormsAsync({arg0: username});
        }).then((result) => {console.log(result[0].return)});
    }

    postForm(form) {
        this.client.then((clientReference) => {
            return clientReference.postFormAsync({arg0: form});
        }).then(result => {return result[0]});
    }
}

module.exports = SoapClient;

