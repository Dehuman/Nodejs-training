import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/users', (req, res) => {
    res.json(res.locals.users);
});

export default usersRouter;