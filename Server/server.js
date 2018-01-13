const Schema = require('./schema');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphQLHTTP = require('express-graphql');
const mongoose = require('mongoose');

mongoose.connect('mongodb://userdb:lifeispain@ds249025.mlab.com:49025/gvme');

const port = 8080;
const app = express();

app.get('/', (request, response) => {
  response.send('I do work');
});

const corsOptions = {
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  next();
};
app.use(allowCrossDomain);

app
  .use('/api', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true }))
  .listen(port, err => {
    if (err) console.log(err);
    else console.log('GraphQL Server is now running');
  });
