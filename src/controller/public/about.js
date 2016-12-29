// @flow
const about = async(ctx: Object) => {

  const n:number = ~~ctx.cookies.get('view') + 1;

  ctx.state = {
    active_about: true,
    title: 'About Page',
    page_views: n,
    subtitle: 'Hello',
    user: ctx.state.user,
    stack: [
      { roll: 'Server', technology: 'Koa2'},
      { roll: 'Templating', technology: 'Handlebars'},
      { roll: 'Package management', technology: 'Yarn'},
      { roll: 'JS Flavor', technology: 'ES2016+'},
      { roll: 'Transpilation', technology: 'Babel'},
      { roll: 'Client JS', technology: 'Browserify'},
      { roll: 'Style', technology: 'Scss'},
      { roll: 'FrontEnd', technology: 'Bootstrap (removeable)'},
      { roll: 'Deployment', technology: 'Docker'},
    ]
  };

  ctx.cookies.set('view', n);

  await ctx.render('about', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });

};

export default about;
