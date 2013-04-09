define(['jquery', 'local_settings', 'base/user', 'utils', 'nunjucks', 'templates'],
  function ($, settings, User, utils, nunjucks) {
  'use strict';

  var user = new User({ env: settings.ENV });
  var body = $('body');
  var title = $('title');
  var currLevel = user.level || 1;
  var defaults;

  var setLevel = function () {
    // We always assume at least a first level for gameplay if the user has nothing stored
    $.getJSON('config/level' + parseInt(currLevel, 10) + '.json', function (d) {
      currLevel = d;

      title.text(currLevel.location);

      // Load initial screen
      utils.loadTemplate('level.html', {
        level: currLevel,
        defaults: defaults
      });
    }).fail(function (err) {
      var error = 'No level1.json configuration file found! Please create one in the config directory';
      utils.loadTemplate('error.html', { message: error });
      throw new Error(error);
    });
  };

  if (settings.DEBUG || !nunjucks.env) {
    // If not precompiled, create an environment with an HTTP loader
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('/templates'));
  }

  // We need dimensions for our game background images
  $.getJSON('config/defaults.json', function (d) {
    defaults = d;
    setLevel();
  }).fail(function (err) {
    var error = 'No defaults.json configuration file found! Please create one in the config directory';
    utils.loadTemplate('error.html', { message: error });
    throw new Error(error);
  });

  body.on('click', function (ev) {
    var self = $(ev.target);

    switch (self.data('action')) {

    }
  });
});
