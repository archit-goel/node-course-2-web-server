const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// To create an APP
var app = express();

// let hbs know that partials would be used
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamit', (text) => {
	return text.toUpperCase();
});

app.use((request, response, next) =>{
	var date = new Date().toString();
	var log = `${date}: ${request.method} ${request.path}`;
	console.log("Request: " + log);
	fs.appendFile('server.log', log +'\n');
	// next() call is must for application to proceed. if no next() then no handler below will get invoked
	next();
});

/*app.use((request, response, next) =>{
	response.render('maintenance.hbs', {
			pageName : "Maintenance Page"
		})
});*/

// To register Express middleware - with absolute path - to register all resources under a folder.
app.use(express.static(__dirname+'/public'));

// Register a handler for HTTP GET Request with no URI
app.get('/', (request, response) => {
	//response.send("<h1>Hello Express !!</h1>");
	
	// send JSON back in response
	/*response.send({
		name : "Archit",
		age : 31,
		mobile : 8527722855,
		hobbies : [
			"driving",
			"songs"
		]
	})*/

	response.render('home.hbs', {
		pageName : "Home Page - Welcome to Goel's",
		//currentYear : new Date().getFullYear(),
		userName : "Archit"
	});
});

// register a handler for /about URI
app.get('/about', (request, response) => {
	//response.send("About page");
	response.render('about.hbs', {
		pageName : "About Page",
		//currentYear : new Date().getFullYear()
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage : "Bad Request"
	});
});

// Bind application to port on machine

//app.listen(3000);
/*app.listen(3000, () => {
	console.log("Server is up on port 3000");
});*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
