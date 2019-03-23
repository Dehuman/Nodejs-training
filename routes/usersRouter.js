import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/users', (req, res) =>
    res.locals.user.findAll().then(users => res.json(users))
);

export default usersRouter;