// Import Express (a web server for Node.js)
const express = require('express');

// Create a new Express-based web server
const app = express();

// Allow express to read request bodies
app.use(express.json());

// Import the database driver
const dbDriver = require('better-sqlite3');

// Connect to the database
const db = dbDriver('megamart.sqlite3');

require('./routes/product')(app, db);
require('./routes/store')(app, db);
require('./routes/inventory')(app, db);

// Serve all files in the frontend folder
app.use(express.static('frontend'));

app.get('/', (req, res) => {
    res.sendFile('./frontend/landing.html', { root: __dirname });
});

app.get('/product', (req, res) => {
    res.sendFile('./frontend/product.html', { root: __dirname });
});

app.get('/stores', (req, res) => {
    res.sendFile('./frontend/stores.html', { root: __dirname });
});

app.get('/inventory', (req, res) => {
    res.sendFile('./frontend/inventory.html', { root: __dirname });
});

// Serve all files in the frontend folder
app.use(express.static('frontend'));

// Start the web server on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});