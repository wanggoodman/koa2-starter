// @flow
import passport from 'koa-passport';

import local from './local';

type User = {
  id: number,
  username: string,
  avartar: string
}
// mock user
var user: User = {
  id: 1,
  username: 'test',
  avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg'
}

passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser((id: number, done) => {
  done(null, user)
})

passport.use(local)

export default passport;
