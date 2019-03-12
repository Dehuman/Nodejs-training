export default function setCookies(req, res, next) {
    req.parsedCookies = req.cookies;
    next();
}