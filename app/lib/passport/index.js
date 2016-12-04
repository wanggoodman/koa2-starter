var passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

var user = { id: 1, username: 'test', avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg' }

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})

passport.use(new LocalStrategy((username, password, done) => {
  // retrieve user ...
  console.log('yo')
  console.log(username, password)
  if (username === 'test' && password === 'test') {
    done(null, user)
  } else {
    done(null, false)
  }
}))

module.exports = passport;

/*
var FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))
*/
