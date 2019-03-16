import express from 'express';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/auth', (req, res) => {
    const user = res.locals.users.find(user =>
        user.name === req.body.name && user.password === req.body.password);

    if (user) {
        const payload = {'id': user.id, 'name': user.name};
        const token = jwt.sign(payload, 'secret', {expiresIn: 60});
        res.send({
            'code': 200,
            'message': 'OK',
            'data': {
                'user': {
                    'email': user.email,
                    'username': user.name
                }
            },
            'token': token
        });
    } else {
        res.status(404).send({
            'code': 404,
            'message': 'User not found'
        });
    }
});

export default authRouter;