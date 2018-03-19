/**
 * Created by bmincey on 5/27/17.
 */

'use strict';

const app = require('express')();
const config = require('./config/config');

require('./config/express.config')(app);

require('./config/mongoose.config')(config);

app.listen(config.dev.port, function() {
    console.log("Listening on port: " + config.dev.port);
});