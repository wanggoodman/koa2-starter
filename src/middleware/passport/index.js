import passport from 'koa-passport';

import local from './local';

// mock user
var user = {
  id: 1,
  username: 'test',
  avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg'
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(null, user)
})

passport.use(local)

export default passport;
