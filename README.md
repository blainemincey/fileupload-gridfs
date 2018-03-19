# fileupload-gridfs
Example Node.js application using MongoDB GridFS

`npm install`

Make sure that MongoDB is installed and running with default settings on localhost

`node app.js`

It is easiest to use Postman to interact with the API: https://www.getpostman.com/.

To test out the install, make a GET request to http://localhost:3000 and it should return "Hello, Blaine"

To try out GridFS, make a POST request to http://localhost:3000/upload.  Be sure to select form-data for the Body, name the key 'file' (this is critical), select the key type to be file, and then select an image from your file system.  Select Send in Postman, and you should receive {"error_code":0,"err_desc":null} if successful.

To retrieve the image and/or file, make a GET request to http://localhost:3000/file/file-1521478694699.jpg where the file variable is the filename field value from MongoDB.  If successful, Postman will display the image.
