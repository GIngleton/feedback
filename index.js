const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

// configuration to ensure express behaves correctly in the production environment
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like main.js
  app.use(express.static('client/build')); // if an unknown route comes in, look in client/build directory

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); // if route is unknown, just serve up index.html
}

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // Heroku uses environment variables
app.listen(PORT);
