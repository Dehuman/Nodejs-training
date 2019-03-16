import express from 'express';

const productsRouter = express.Router();

productsRouter
    .get('/products', (req, res) => {
        res.json(res.locals.products);
    })
    .get('/products/:id', (req, res) => {
        res.json(res.locals.products.find(product => product.id == req.params.id));
    })
    .get('/products/:id/reviews', (req, res) => {
        res.json(res.locals.products.find(product => product.id == req.params.id).reviews);
    })
    .post('/products', (req, res) => {
        res.locals.products.push(req.body);
        res.send(req.body);
    });

export default productsRouter;