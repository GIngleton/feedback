const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serialize user to generate identifying piece of info for cookie
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// pull user id out of cookie and turn it back into user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    return done(null, user);
  });
});

//Alerts application that we want to use the Google Strategy with passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' // route for user returning from google
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // there is already a record with the given profile ID
          return done(null, existingUser);
        } else {
          // there is no record with the given profile ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
