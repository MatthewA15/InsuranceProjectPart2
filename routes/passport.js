const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
          try {
            const user = await User.findOne({ username: username });
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
      
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              return done(null, false, { message: 'Incorrect password.' });
            }
      
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        })
      );
  
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });
  };
