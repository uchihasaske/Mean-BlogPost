const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err) => {
  if(err){
    console.log('Unable to connect to database ' + err);
    }
    else {
      console.log('Congratulation connected to database ' + config.db);
    }
});

app.use(express.static(__dirname + '/client/dist/'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080 ,() => {
  console.log('Listening on 8080');
});
