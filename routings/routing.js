/**
 * Created by bmincey on 5/27/17.
 */

'use strict';

const router = require('express').Router();
const config = require('../config/config');
const mongoose = require('mongoose');

var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

var conn = mongoose.connection;

Grid.mongo = mongoose.mongo;

conn.once('open', function(){

    console.log('Open...');

    var gfs = Grid(conn.db);

    /** Setting up storage using multer-gridfs-storage */
    var storage = GridFsStorage({

        gfs : gfs,
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        },
        /** With gridfs we can store additional meta-data along with the file */
        metadata: function(req, file, cb) {
            cb(null, { originalname: file.originalname,
                      "myMetaDataTag1" : "metaData1",
                      "myMetaDataTag2" : "metaData2" });
        },
        root: 'ctFiles' //root name for collection to store files into
    });


    var upload = multer({ //multer settings for single upload
        storage: storage

    }).single('file');


    /***** ROUTES *****/
    /** Simple GET test */
    /** http://localhost:3000/ **/
    router.get('/', function (req, res) {
        res.send('Hello Blaine!');
    });

    /** API path that will upload the files */
    router.post('/upload', function(req, res) {

        upload(req,res,function(err){

            console.log("Uploading file...");

            if(err){
                console.log('Error uploading file...');
                res.json({error_code:1,err_desc:err});
                return;
            }
            console.log('Successful upload');

            res.json({error_code:0,err_desc:null});
        });
    });

    /** Get list of files */
    router.get('/file/:filename', function(req, res){
        gfs.collection('ctFiles'); //set collection name to lookup into

        /** First check if file exists */
        gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
            if(!files || files.length === 0){
                return res.status(404).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            /** create read stream */
            var readstream = gfs.createReadStream({
                filename: files[0].filename,
                root: "ctFiles"
            });
            /** set the proper content type */
            res.set('Content-Type', files[0].contentType)
            /** return response */
            return readstream.pipe(res);
        });
    });

});

module.exports = router;