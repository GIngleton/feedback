const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    // how long cookie can remain in browser before expiring
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    // key used to encrypt cookie
    keys: [keys.cookieKey] // multiple keys can be provided for extra security
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // Heroku uses environment variables
app.listen(PORT);
