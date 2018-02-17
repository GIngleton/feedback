const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // logout is a function automatically attached to req by passport
    res.redirect('/'); // returns undefined so that the user knows that they are logged out
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
