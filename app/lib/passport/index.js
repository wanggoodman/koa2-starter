import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

//import { localLogin } from './local'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(null, user)
})

//passport.use('local-login', localLogin)
var user = {
  id: 1,
  username: 'test',
  avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg'
}
const local = new LocalStrategy((username, password, done) => {
  if (username === 'test' && password === 'test') {
    done(null, user)
  } else {
    done(null, false)
  }
})
passport.use(local)


export default passport;
