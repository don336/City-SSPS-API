import express from 'express';
import session from 'express-session';
import passport from 'passport';

const routerUser = express.Router();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

routerUser.get('/auth/login',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

routerUser.get('/auth/callback',
    passport.authenticate('google', {
        successRedirect: '/user/protected',
        failureRedirect: '/user/auth/failure',
        scope: ['email', 'profile']
    })
);

routerUser.get('/protected', isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    res.send(`Hello there ${name}!`);
});

routerUser.get('/auth/failure', (req, res) => {
    res.send('Something went wrong!');
});

routerUser.use('/auth/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out successfully, see you soon!');
});

export default routerUser;