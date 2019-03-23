import express from 'express';

const productsRouter = express.Router();

productsRouter
    .get('/products', (req, res) =>
        res.locals.product.findAll().then(products => res.json(products)))
    .get('/products/:id', (req, res) =>
        res.locals.product.findByPk(req.params.id).then(product => res.json(product)))
    .get('/products/:id/reviews', (req, res) =>
        res.locals.review.findAll({where: {productId: req.params.id}}).then(reviews => res.json(reviews)))
    .post('/products', (req, res) => {
        res.locals.product.create(req.body);
        res.send(req.body);
    });

export default productsRouter;