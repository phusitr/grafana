var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

app.use(bodyParser.json());

var timeserie = require('./example.json');

function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "accept, content-type");  
}


app.all('/', function(req, res) {
  setCORSHeaders(res);
  res.send('JSON plugin adapter for grafana');
  res.end();
});

app.all('/search', function(req, res){
  setCORSHeaders(res);
  var result = [];
  _.each(timeserie, function(ts) {
    result.push(ts.target);
  });
  
  res.json(result);
  res.end();
});

app.all('/query', function(req, res){
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  var tsResult = [];
  let Data = timeserie;

  _.each(req.body.targets, function(target) {
      var k = _.filter(Data, function(t) {
        return t.target === target.target;
      });

      _.each(k, function(kk) {
        tsResult.push(kk)
      });
  });

  res.json(tsResult);
  res.end();
});

app.listen(3333);
console.log('Listen port 3333');
