import express from 'express';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/auth', (req, res) => {
    res.locals.user.findOne({
        where: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(user => {
        if (user) {
            const payload = {'id': user.id, 'name': user.name};
            const token = jwt.sign(payload, 'secret', {expiresIn: 600});
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
});

export default authRouter;