const MongoClien = require("mongoDB").MongoClien



MongoClien.connect("mongodb://localhost:27017/test", (err, connection) => {
    if(err) {console.log(err)}
    module.exports.db = connection 
})
