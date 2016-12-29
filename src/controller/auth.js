// @flow
import passport from '../middleware/passport';

const auth = async(ctx: Object, next: () => Promise<any>) => {

  return passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })(ctx, next);

};

export { auth };
