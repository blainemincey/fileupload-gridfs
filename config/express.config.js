/**
 * Created by bmincey on 5/27/17.
 */

"use strict";

const logger     = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(logger('dev'));
    app.use((req,res,next) => {

        res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);

        next();


    });


    app.use(bodyParser.json());

    /** Routes configuration */
    let main = require('../routings/routing.js');
    app.use('/', main);

}


