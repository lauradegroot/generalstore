define(['jquery', 'local_settings', 'base/user', 'utils', 'nunjucks', 'templates'],
  function ($, settings, User, utils, nunjucks) {
  'use strict';

  if (settings.DEBUG || !nunjucks.env) {
    // If not precompiled, create an environment with an HTTP loader
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('/templates'));
  }

  var currLevel;
  var defaults;

  // We need dimensions for our game background images
  $.getJSON('config/defaults.json', function (d) {
    defaults = d;
  }).fail(function (err) {
    var error = 'No defaults.json configuration file found! Please create one in the config directory';
    utils.loadTemplate('error.html', { message: error });
    throw new Error(error);
  });

  // We always assume at least a first level for gameplay
  $.getJSON('config/level1.json', function (d) {
    currLevel = d;
  }).fail(function (err) {
    var error = 'No level1.json configuration file found! Please create one in the config directory';
    utils.loadTemplate('error.html', { message: error });
    throw new Error(error);
  });

  var user = new User({ env: settings.ENV });

  var body = $('body');

  body.on('click', function (ev) {
    var self = $(ev.target);

    switch (self.data('action')) {

    }
  });
});
