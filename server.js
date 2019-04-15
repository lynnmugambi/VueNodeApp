var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    routes = require('./routes');

mongoose.connect("mongodb://localhost:27017/vuenodedb").then(
  () => {console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database'+ err)}
);

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/api', routes);

app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


