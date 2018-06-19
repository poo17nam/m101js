var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"category_code": "biotech"};

    //just makes the cursor object and returns it
    var cursor = db.collection('companies').find(query);

    //cursor objects provide a forEach method
    //which is different from forEach for Arrays
    /** form of cursor forEach method :
    *   first argument -> callback fo riterating through the documents
    *   second argument -> what to do when cursor is exhausted or encounters an error
    **/
    cursor.forEach(
        function(doc) {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        },
        function(err) {
            assert.equal(err, null);
            return db.close();
        }
    );

});
