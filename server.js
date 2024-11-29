// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });


// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
// Import routing files
var documentsRoutes = require('./server/routes/documents');
var messagesRoutes = require('./server/routes/messages');
var contactsRoutes = require('./server/routes/contacts');


var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Add URL routes
app.use('/api/documents', documentsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/contacts', contactsRoutes);

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));


// Handle non-API routes and fallback to Angular's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms', 'index.html'));
});

// Tell express to map the default route ('/') to the index route
// app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// Tell express to map all other non-defined routes back to the index page

// app.use(function (req, res, next) {
//   res.render('index');
// })


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/cms'));
// });

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost:' + port)
});


// establish a connection to the mongo database and specify the collection "cms"
mongoose.connect(process.env.mongoURL, { dbName: 'cms' })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(err => {
    console.log('Connection failed: ' + err);
  });
