'use strict';

var controller = require('../controllers/website.server.controller');

module.exports = function(app) {
    app.route('/websites')
        .get(isAuthenticated, controller.list)
        .post(isAuthenticated, controller.save);
    
    app.route('/websites/:id')
        .get(isAuthenticated, controller.getWebsite)
        .delete(isAuthenticated, controller.delete);
};

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/signin');
}
