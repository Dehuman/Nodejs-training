import app from './express-app';

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`App listening on port ${port}!`));