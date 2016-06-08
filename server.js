var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, DELETE, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTION")
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
    request({
      uri: "http://localhost:8080/hello-web/api/dbOperation/Account/",
      method: "GET",
    }, function(error, response, body) {
      res.send(body)
    });
});

app.get('/getCustomer', function (req, res) {
  console.log(req.query.acnum);
  request({
      uri: "http://localhost:8080/hello-web/api/dbOperation/Account/" + req.query.acnum,
      method: "GET",
    }, function(error, response, body) {
      console.log(body)
      res.send(body)
    });
})

app.delete('/del', function (req, res) {

    request({
      uri: "http://localhost:8080/hello-web/api/dbOperation/Account/" + req.body.acnum ,
      method: "DELETE",
    }, function(error, response, body) {
      res.send(body)
    });
});

app.post('/updateCustomer', function (req, res) {
    console.log(req.body.formData)
    request({
      uri: "http://localhost:8080/hello-web/api/dbOperation/Account/",
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: req.body.formData,
    }, function(error, response, body) {
      res.send(body)
    });
});

app.post('/newCustomer', function (req, res) {
    console.log(req.body.formData)
    request({
      uri: "http://localhost:8080/hello-web/api/dbOperation/Account/",
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: req.body.formData,
    }, function(error, response, body) {
      res.send(body)
    });
});


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})