/*
 * Simple Express template server
 */

// Requirements
var express = require('express'),
    engines = require('consolidate'),
    fs = require('fs'),
    path = require('path');


// App instance
var app = express();

// Views
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Default directory
app.set('views', __dirname + '/views');

// Example static media directory

app.use(express.static(path.join(__dirname + '/views')));

// Simple JSON file parser
var get_JSON = function(path) {
    var fileContents = fs.readFileSync(path, 'utf8');
    return JSON.parse(fileContents);
}

// Wrapper for template render and JSON parser
var render = function(res, view, json_path) {
    var data = get_JSON(json_path);
    res.render(view, data);
};

// Routes
app.get('/', function(req, res) {
    render(res, 'index', 'data/simple.json');
});

// Go!
app.listen(3000);
console.log('Listening on port 3000');
