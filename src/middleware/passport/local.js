// @flow
import { Strategy as LocalStrategy } from 'passport-local';

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
};

const local = new LocalStrategy((username: string, password: string, done) => {

  if (username === 'test' && password === 'test') {
    done(null, user);
  } else {
    done(null, false);
  }
});

export default local;
