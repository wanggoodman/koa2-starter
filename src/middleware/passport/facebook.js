import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

var user = {
  id: 1,
  username: 'test',
  avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg'
}

export const localLogin = passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'test' && password === 'test') {
    done(null, user)
  } else {
    done(null, false)
  }
}))
