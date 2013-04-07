define(['jquery', 'local_settings', 'base/user', 'nunjucks', 'templates'],
  function ($, settings, User, nunjucks) {
  'use strict';

  if (settings.DEBUG || !nunjucks.env) {
    // If not precompiled, create an environment with an HTTP loader
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('../templates'));
  }

  var user = new User({ env: settings.ENV });

  var body = $('body');

  body.on('click', function (ev) {
    var self = $(ev.target);

    switch (self.data('action')) {

    }
  });
});
