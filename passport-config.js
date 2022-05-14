/** @format */

const { user_game } = require('./models');
const bcrypt = require('bcrypt');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await user_game.findOne({ where: { username: username } });
      if (!user) {
        return done(null, false, { message: 'username salah!' });
      }
      const passVal = await bcrypt.compare(password, user.password);
      if (!passVal) {
        return done(null, false, { message: 'password salah!' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user_game.findByPk(id).then(function (user) {
    done(null, user);
  });
});
