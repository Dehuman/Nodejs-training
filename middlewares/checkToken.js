import jwt from 'jsonwebtoken';

export default function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(401).send({
                    'code': 401,
                    'message': 'Authorization was failed'
                });
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({
            'code': 401,
            'message': 'No token provided'
        });
    }
}