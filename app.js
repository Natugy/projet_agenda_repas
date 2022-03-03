const express = require('express');
const mysql=require('mysql')
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");


const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'dbagenda'
});

connection.connect();

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

 // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.post('/connexion', (request,response)=> {
  // Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
        
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/');
			} else {
        console.log('mauvais jack')
				response.redirect('/connexion')
        
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
})


//Render
app.set('view engine', 'ejs');

app.get('/',(request,response) =>{
  console.log(request.session)
  if(request.session.loggedin){
    response.render('pages/index', {test : "Connecté"});
  }
  else {
    response.render('pages/index', {test : "Non connecter"});
  }
});

app.get('/about',(request,response) =>{
  request.session.test = "test";
  response.render('pages/about', {test: "c drole haha"});
  
});
app.get('/test',(request,response) =>{
  response.render('pages/test', {test: "c drole haha"});
  
  });
  app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});
app.get('/connexion',(request,response)=> {
  response.render('pages/connexion',{test: "c drole haha"});
});
app.get('/inscription',(request,response)=> {
  response.render('pages/inscription',);
});

module.exports =app;