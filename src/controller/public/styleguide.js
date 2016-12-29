// @flow
const styleguide = async(ctx: Object) => {

  ctx.state = {
    active_styleguide: true,
    title: 'Documentationn Page',
    user: ctx.state.user,
  };

  await ctx.render('styleguide', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });

};

export default styleguide;
