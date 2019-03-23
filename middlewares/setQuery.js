export default function setQuery(req, res, next) {
    req.parsedQuery = req.query;
    next();
}