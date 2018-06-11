const express = require('express');
const app = express()
const engines = require('consolidate');
const bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err,req,res,next) {
  console.log(err.message);
  console.log(err.stack);
  res.status(500).render('error_template',{error:err});
}

app.get('/',(req,res,next)=>{
  res.render('fruitPicker',{'fruits':['apple','orange','banana','peach']})
})

app.post('/favorite_fruit',(req,res,next)=>{
  var favorite = req.body.fruit;
  if (typeof favorite == 'undefined') {
    next('Please choose a fruit');
  }else{
    //res.send('Your favorite fruit is ',favorite)
    res.status(200).send(`Your favorite fruit is ,${favorite}`)
  }
})


app.use(errorHandler);

var server = app.listen(3000,()=>{
  var port = server.address().port;
  console.log("Express server running on port %s",port);
})
