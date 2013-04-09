define(['jquery', 'local_settings', 'base/user', 'utils', 'nunjucks', 'templates'],
  function ($, settings, User, utils, nunjucks) {
  'use strict';

  if (settings.DEBUG || !nunjucks.env) {
    // If not precompiled, create an environment with an HTTP loader
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('/templates'));
  }

  var user = new User({ env: settings.ENV });
  var currLevel;

  try {
    currLevel = require('../../config/level1.json');
  } catch (err) {
    var error = 'No Level 1 configuration file found! Please create one in the config directory';
    utils.loadTemplate('error.html', { message: error });
    throw new Error(error);
  }

  var body = $('body');

  body.on('click', function (ev) {
    var self = $(ev.target);

    switch (self.data('action')) {

    }
  });
});
