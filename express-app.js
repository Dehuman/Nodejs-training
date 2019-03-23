import express from 'express';
import cookieParser from 'cookie-parser';
import {product, review, sequelize, user} from './models';
import {checkToken, setCookies, setQuery} from './middlewares';
import {authRouter, productsRouter, usersRouter} from './routes';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

sequelize.sync();

const app = express();
app.use(cookieParser(), express.json());
app.use(setCookies, setQuery);

app.use((req, res, next) => {
    res.locals.user = user;
    res.locals.product = product;
    res.locals.review = review;
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
        user.findOne({
            where: {
                name: username,
                password: password
            }
        }).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false, {message: 'User not found'});
            }
        });
    }
));
app.post('/api/auth/local',
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
        user.findByPk(profile.id).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false, {message: 'User not found'});
            }
        });
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
        user.findByPk(profile.id).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false, {message: 'User not found'});
            }
        });
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
        user.findByPk(profile.id).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false, {message: 'User not found'});
            }
        });
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