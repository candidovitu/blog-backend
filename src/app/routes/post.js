const jwt = require('jsonwebtoken');
const routes = require('express').Router();

const PostController = require('../controllers/PostController');

routes.get('/:id', PostController.get);
routes.get('/list/:page', PostController.list);

routes.use((req, res, next) => {
    const { token } = req.headers;
    if(!token) return res.status(401).json({message: 'O token de sessão não foi inserido'});

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err) return res.status(500).json({message: 'Falha ao efetuar autenticação'});

        req.userId = decoded.id;
        next();
    });
});

routes.post('/create', PostController.create);

module.exports = routes;