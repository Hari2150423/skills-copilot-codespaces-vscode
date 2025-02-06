//create the web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments.json');

//create the server
http.createServer(function (req, res) {
	//parse the url
	var pathname = url.parse(req.url).pathname;
	//parse the query
	var query = url.parse(req.url).query;