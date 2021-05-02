'use strict';

const soap = require('soap');

class SoapClient {

    constructor(url) {
        const request = require('request');
        const specialRequest = request.defaults({
            strictSSL: false
        });
        this.url = url;
        this.client = soap.createClientAsync(url, {request: specialRequest});
    }

    // test() {
    //     soap.createClientAsync('http://192.168.0.101:7000/ws/FormWebService?wsdl').then((client) => {
    //         return client.getFormsAsync({
    //             arg0: 'admin'
    //         });
    //     }).then((result) => console.log(result[0].return));
    // }

    getFormsByUsername(username) {
     return this.client.then((clientReference) => {
	    console.log(clientReference.describe());

            return clientReference.getFormsAsync({arg0: username});
        }).then((result) => {
	    console.log('AQUI');
	    console.log(result);
            if (result[0] != null) {
		return result[0].return;
            }
        }).catch(err => console.log(err));
    }

    postForm(form) {
       
       console.log('Received at postForm');
       console.log(form)
       return this.client.then((clientReference) => {
	    console.log('DONDE SE FUE TU AMOR PARA BUSCARLO RAPIDO?');
            return clientReference.createFormAsync({arg0: form});
        }).then(result => {return result}).catch((err) =>{console.log('ERR'); console.log(err)});
    }
}

module.exports = SoapClient;

