var express = require('express');
var fs = require('fs');
var cassandra = require('cassandra-driver');
var actions = require('./actions');
var client = new cassandra.Client({ 
	contactPoints: ['127.0.0.1'], 
	keyspace:'ksfabio'
});
client.on('error', function(err){
	console.error(err.name, err.message);
});	
var app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/css/*', function (req, res) {
  res.sendfile(__dirname + '/www/css/' + req.params[0]);
});

app.get('/js/*', function (req, res) {
  res.sendfile(__dirname + '/www/js/' + req.params[0]);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/www/index.html');
});

app.post('/contact', function (req, res) {
	if(typeof(req.body.contactEdit) != "undefined"){
		actions.UpdateContact(req, res, client);
	} else {
		actions.InsertContact(req, res, client);
	}
});

app.post('/delete', function (req, res) {	
	actions.DeleteContact(req, res, client);
});

app.get('/loadData', function (req, res) {
	actions.LoadContacts(req, res, client);
});

app.listen(8181);
console.log('Run in port 8181');
