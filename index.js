
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const logger = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var controllers = require('./controllers');
app.use(controllers);

    app.listen(process.env.PORT || 3001,function() {
      console.log("Server Running....");
    });
