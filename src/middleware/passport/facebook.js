import passport from 'koa-passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'

var user = {
  id: '2',
  username: 'test',
  avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg',
  facebookId: 'xxxxxx'
}

export const facebookLogin = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {

    //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
  }
)

export default facebookLogin;
