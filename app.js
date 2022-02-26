const express = require('express');

const app = express();

//Render
app.set('view engine', 'ejs');

app.get('/',(request,response) =>{
  response.render('pages/index', {test: "c drole haha"});

});

app.get('/about',(request,response) =>{
  response.render('pages/about', {test: "c drole haha"});

});
app.get('/test',(request,response) =>{
    response.render('pages/test', {test: "c drole haha"});
  
  });
module.exports =app;