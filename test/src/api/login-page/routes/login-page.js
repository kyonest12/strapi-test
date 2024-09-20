'use strict';

const middlewares = require('../../../../config/middlewares');

/**
 * login-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::login-page.login-page'), {
    config: {
        find: {
            middlewares: ['api::login-page.middleware'],
        },
        findOne: {
            middlewares: ['api::login-page.middleware'],
        }
    },
};
