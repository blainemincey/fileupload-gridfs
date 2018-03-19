/**
 * Created by bmincey on 5/27/17.
 */

"use strict";

let mongoose = require('mongoose');

module.exports = (config) => {

    var mongoURI = config.dev.db;

    mongoose.connect(mongoURI);

    /** Connection events */
    mongoose.connection.on('connected', function() {
       console.log('Mongoose connected to ' + mongoURI);
    });

    mongoose.connection.on('error', function (err) {
       console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    })



}