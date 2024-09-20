'use strict';

/**
 * `middleware` middleware
 */

const populate = {
  form: {
    populate: "*"
 }
}
module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In middleware middleware.');
    ctx.query = {populate,...ctx.query,}
    await next();
  };
};
