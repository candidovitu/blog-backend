const routes = require('express').Router();

const UserController = require('../controllers/UserController');

routes.post('/auth', UserController.auth);
routes.post('/register', UserController.create);

module.exports = routes;