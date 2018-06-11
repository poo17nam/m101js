const express = require('express');
const app = express();
const engines = require('consolidate');
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'video'

MongoClient.connect(dbUrl, (err, client) => {

  assert.equal(null, err);
  console.log("Successfully connected to MongoDB");

  const db = client.db(dbName);

  app.get('/', (req, res) => {
    //res.render('hello',{'name':'templates'})

    db.collection('movies').find({}).toArray((err, docs) => {
      res.render('movies', {
        movies: docs
      })
    })
  });

  app.use((req, res) => {
    res.sendStatus(404);
  });

  var server = app.listen(3000, () => {
    var port = server.address().port;
    console.log("Express server listening on port %s", port);
  })
})
