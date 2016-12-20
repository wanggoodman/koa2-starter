import passport from '../middleware/passport';

const auth = async(ctx, next) => {

  return passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })(ctx, next)

}

export { auth }
