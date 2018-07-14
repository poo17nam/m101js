var MongoClient = require('mongodb').MongoClient;

var dbUrl = "mongodb://localhost:30001,localhost:30002,localhost:30003/course?replicaSet=replica_set"

MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function(err, database) {
    if (err) throw err;
    const myAwesomeDB = database.db('course')
    myAwesomeDB.collection("repl").insert({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;

        myAwesomeDB.collection("repl").findOne({ 'x' : 1 }, function(err, doc) {
            if (err) throw err;

            console.log(doc);
            database.close();
        });
    });
});
