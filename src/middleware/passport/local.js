import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

// mock user
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

export default local;
