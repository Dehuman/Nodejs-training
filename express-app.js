import express from 'express';
import cookieParser from 'cookie-parser';
import {Product, User} from './models';
import {checkToken, setCookies, setQuery} from './middlewares';
import {authRouter, productsRouter, usersRouter} from './routes';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

const products = [
    new Product(1, 'prod1', ['review11', 'review12', 'review13']),
    new Product(2, 'prod2', ['review21', 'review22']),
    new Product(3, 'prod3', ['review31'])
];

const users = [
    new User(1, 'user1', 'password1', 'user1@mail.com'),
    new User(2, 'user2', 'password2', 'user2@mail.com'),
    new User(3, 'user3', 'password3', 'user3@mail.com')
];

const app = express();
app.use(cookieParser(), express.json());
app.use(setCookies, setQuery);

app.use((req, res, next) => {
    res.locals.products = products;
    res.locals.users = users;
    next();
});

// JWT
app.use('/api', authRouter, checkToken, productsRouter, usersRouter);


// Passport
app.use(passport.initialize());


// Passport local strategy
passport.use(new LocalStrategy({
        session: false
    },
    (username, password, done) => {
        const user = users.find(user =>
            user.name === username && user.password === password);
        if (user) {
            done(null, user);
        } else {
            done(null, false, {message: 'User not found'});
        }
    }
));
app.post('/api/auth',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        session: false
    })
);


// Passport facebook strategy
passport.use(new FacebookStrategy({
        clientID: 'FACEBOOK_APP_ID',
        clientSecret: 'FACEBOOK_APP_SECRET',
        callbackURL: "http://localhost:9000/api/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        const user = users.find(user =>
            user.id === profile.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false, {message: 'User not found'});
        }
    }
));
app.get('/api/auth/facebook',
    passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


// Passport twitter strategy
passport.use(new TwitterStrategy({
        consumerKey: 'TWITTER_CONSUMER_KEY',
        consumerSecret: 'TWITTER_CONSUMER_SECRET',
        callbackURL: "http://localhost:9000/api/auth/twitter/callback"
    },
    (token, tokenSecret, profile, done) => {
        const user = users.find(user =>
            user.id === profile.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false, {message: 'User not found'});
        }
    }
));
app.get('/api/auth/twitter',
    passport.authenticate('twitter'));
app.get('/api/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


// Passport google strategy
passport.use(new GoogleStrategy({
        clientID: 'GOOGLE_CLIENT_ID',
        clientSecret: 'GOOGLE_CLIENT_SECRET',
        callbackURL: "http://localhost:9000/api/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        const user = users.find(user =>
            user.id === profile.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false, {message: 'User not found'});
        }
    }
));
app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));
app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


export default app;