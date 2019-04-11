// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const jsonFile = require('./src/assets/data.json');

app.use(express.static(__dirname + "../src/assets"));
app.use(express.static(__dirname + '/dist/mapapp'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/mapapp/index.html'));
});

app.get('/api/allMarker', function (req, res) {
  res.json(jsonFile);
})

app.post('/api/addMarker',function(req,res){
    fs.readFile('./src/assets/data.json', function (err, data) {
    var json = JSON.parse(data)
    json.push(req.body);
    fs.writeFile('./src/assets/data.json', JSON.stringify(json),function(err,dat){
      res.json({"message":"data updated successfully"});
    })
  })
});

app.listen(process.env.PORT || 4200, function() {
  console.log('Listening on port ' + this.address().port); //Listening on port 8888
});
