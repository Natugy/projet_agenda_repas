const express = require('express');

const app = express();

app.post('/connexion', (req,res)=> {
  console.log(req.body);
  res.redirect('/')
})


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
app.get('/connexion',(request,response)=> {
  response.render('pages/connexion',{test: "c drole haha"});
});
app.get('/inscription',(request,response)=> {
  response.render('pages/inscription',);
});

module.exports =app;