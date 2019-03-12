import express from 'express';
import cookieParser from 'cookie-parser';
import {Product, User} from './models';
import {setCookies, setQuery} from './middlewares';
import {productsRouter, usersRouter} from './routes';

const products = [
    new Product(1, 'prod1', ['review11', 'review12', 'review13']),
    new Product(2, 'prod2', ['review21', 'review22']),
    new Product(3, 'prod3', ['review31'])
];

const users = [
    new User(1, 'user1'),
    new User(2, 'user2'),
    new User(3, 'user3')
];

const app = express();
app.use(cookieParser(), express.json());
app.use(setCookies, setQuery);

app.use((req, res, next) => {
    res.locals.products = products;
    res.locals.users = users;
    next();
});

app.use('/api', productsRouter, usersRouter);

export default app;