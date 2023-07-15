import express from 'express';
import session from 'express-session';
import passport from 'passport';

const routerUser = express.Router();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

routerUser.get('/auth/login', (req, res, next) => {
    if (req.isAuthenticated()) {
      // User is already authenticated, redirect to protected route or home page
      return res.redirect('/user/protected');
    }
  
    // User is not authenticated, proceed with authentication
    passport.authenticate('google', {
      scope: ['email', 'profile']
    })(req, res, next);
  });

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
    req.flash('error', req.flash('error')[0]); 
    res.redirect('/user/auth/login'); 
  });

routerUser.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/'); 
    });
  });

export default routerUser;