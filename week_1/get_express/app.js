const express = require('express');
const app = express()
const engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Handler for internal server errors
function errorHandler(err,req,res,next) {
  console.log(err.message);
  console.log(err.stack);
  res.status(500).render('error_template',{error:err});
}

app.get('/:name',(req,res,next)=>{
  var name = req.params.name;
  var getvar1 = req.query.getvar1;
  var getvar2 = req.query.getvar2;
  res.render('hello',{name: name, getvar1 : getvar1, getvar2 : getvar2})
})

app.use(errorHandler);

var server = app.listen(3000,()=>{
  var port = server.address().port;
  console.log("Express server running on port %s",port);
})
