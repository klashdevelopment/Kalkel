var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/docs'));
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log("App listening on port " + port);
});