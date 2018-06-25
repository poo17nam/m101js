const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase',function (err,db) {

  assert.equal(err,null);
  console.log("Successfully connected to MongoDB.");

  var query = {"permalink":{"$exists": true, "$ne": null}};
  var projection = {"permalink":1,"updated_at":1}

  var cursor = db.collection('companies').find(query);
  cursor.project(projection);
  cursor.sort({"permalink":1});

  var markedforRemoval = [];

  var previous = { "permalink": "", "updated_at": ""}

  cursor.forEach(
    function (doc) {
      if ((doc.permalink == previous.permalink) && (doc.updated_at == previous.updated_at)) {
        markedforRemoval.push(doc._id);
      }

      previous = doc;
    },
    function (err) {

      assert.equal(err);

      var filter = {"_id":{"$in": markedforRemoval}}

      db.collection('companies').deleteMany(filter,function (err,res) {

        //assert(err,null);
        console.log(res.result);
        console.log(markedforRemoval.length," documents deleted.");
      })
    }
  )

})
