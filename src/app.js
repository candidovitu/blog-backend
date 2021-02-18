require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./app/routes');
const { User, Post } = require('./app/models');

app.use(express.json());

app.use('/account', routes.account);
app.use('/post', routes.post);

Post.belongsTo(User);

module.exports = app;