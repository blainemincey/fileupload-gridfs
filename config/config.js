/**
 * Created by bmincey on 5/27/17.
 */
module.exports = {

    dev : {
        port : process.env.port  || 3000,
        db   : process.env.MONGO || "mongodb://127.0.0.1/testgridfs"

    },
    prod : {

        // ToDo!
    }

}
